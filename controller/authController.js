const user = require("../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { verifyEmail, registrationEmail, passwordResetEmail } = require("../services/emaillFormats");

const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    const existingUser = await user.findOne({ where: { email } });

    if (existingUser && existingUser.is_verified) {
      res.status(400).json({ message: "User already exists with this email." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (existingUser && !existingUser.is_verified) {
      await existingUser.destroy();
    }

    const newUser = await user.create({
      userName: username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    const verificationToken = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?token=${verificationToken}`;

    await verifyEmail(newUser.username, verificationLink, newUser.email);

    res.status(201).json({
      message:
        "User created successfully. Please check your email to verify your account.",
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
    return;
  }
};

const EmailVerification = async (req, res, next) => {
    const { token } = req.query;
    if (!token) {
      res.status(400).json({ message: "Token is required." });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      const newUser = await user.findByPk(decoded.id);
      if (!newUser) {
        res
          .status(400)
          .json({ message: "Invalid token or user does not exist." });
        return;
      }

      newUser.isVerified = true;
      await newUser.save();
      await registrationEmail(newUser.dataValues.userName, newUser.dataValues.email);

      res
        .status(200)
        .json({ message: "Email verified successfully. You can now log in." });
      return;
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
      return;
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  try {
    const newUser = await user.findOne({ where: { email } });
    if (!newUser) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    if (!newUser.dataValues.isVerified) {
      res.status(400).json({ message: "Please verify your email to login." });
      return;
    }

    const isMatch = await bcrypt.compare(password, newUser.dataValues.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials." });
      return;
    }

    const payload = {
      user_id: newUser.dataValues.id,
      username: newUser.dataValues.userName,
      email: newUser.dataValues.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
    return;
  }
}

const forgotPassword = async (req, res, next) => {
        const { email } = req.body;
        if (!email) {
          res.status(400).json({ message: "Email is required." });
          return;
        }
    
        try {
          const newUser = await user.findOne({ where: { email } });
          if (!newUser) {
            res.status(400).json({ message: "User not found." });
            return;
          }
    
          const payload = {
            id: newUser.dataValues.id,
            email: newUser.dataValues.email,
          };
    
          const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    
          const resetLink = `http://localhost:3000/api/v1/auth/reset-password?token=${token}`;
    
          await passwordResetEmail(newUser.dataValues.email, newUser.dataValues.username, resetLink);
    
          res
            .status(200)
            .json({ message: "Password reset link sent to your email." });
          return;
        } catch (error) {
          res.status(500).json({ message: "Server error.", error });
          return;
        }
};

const resetPassword = async (req, res, next) => {
    const { password, token } = req.body;
  
  if (!token || !password) {
    res.status(400).json({ message: "Token and password are required." });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const newUser = await user.findByPk(decoded.id);
    if (!newUser) {
      res.status(400).json({ message: "Invalid token or user does not exist." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;
    await newUser.save();

    res.status(200).json({ message: "Password reset successfully." });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
    return;
  }
}

module.exports = { signUp, EmailVerification, login, forgotPassword, resetPassword };
