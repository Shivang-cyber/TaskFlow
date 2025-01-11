const user = require("../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const { verifyEmail, registrationEmail, passwordResetEmail } = require("../services/emaillFormats");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signUp = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError("All fields are required.", 400));
  }

  const existingUser = await user.findOne({ where: { email } });

  if (existingUser && existingUser.isVerified) {
    return next(new AppError("User already exists.", 400));
  }

  if (existingUser && !existingUser.is_verified) {
    await existingUser.destroy();
  }

  const newUser = await user.create({
    userName: username,
    email,
    password: password,
    isVerified: false,
  });

  if (!newUser) {
    return next(new AppError("User not created.", 500));
  }

  const verificationToken = jwt.sign(
    { id: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  const verificationLink = `http://localhost:3000/api/v1/auth/verify-email?token=${verificationToken}`;

  await verifyEmail(newUser.username, verificationLink, newUser.email);

  return res.status(201).json({
    status: "success",
    message:
      "User created successfully. Please check your email to verify your account.",
  });
});

const EmailVerification = catchAsync(async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return next(new AppError("Token is required.", 400));
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded.id) {
    return next(new AppError("Invalid token payload.", 400));
  }

  const newUser = await user.findByPk(decoded.id);
  if (!newUser) {
    return next(new AppError("Invalid token or user does not exist.", 400));
  }

  newUser.isVerified = true;
  await newUser.save();
  await registrationEmail(newUser.userName, newUser.email);

  res.status(200).json({ status: 'success', message: "Email verified successfully." });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("All fields are required.", 400));
  }

  const newUser = await user.findOne({ where: { email } });
  if (!newUser) {
    return next(new AppError("Invalid credentials.", 400));
  }

  if (!newUser.dataValues.isVerified) {
    return next(new AppError("Please verify your email to login.", 400));
  }

  const isMatch = await bcrypt.compare(password, newUser.dataValues.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials.", 400));
  }

  const payload = {
    user_id: newUser.dataValues.id,
    username: newUser.dataValues.userName,
    email: newUser.dataValues.email,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ status: 'success', message: token });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("Email is required.", 400));
  }

  const newUser = await user.findOne({ where: { email } });
  if (!newUser) {
    return next(new AppError("User with this email does not exist.", 404));
  }

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });
  
  await passwordResetEmail(newUser.email, newUser.userName,  token);

  res.status(200).json({ status: 'success', message: "Password reset email sent." });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return next(new AppError("Token and new password are required.", 400));
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded.id) {
    return next(new AppError("Invalid token payload.", 400));
  }

  const newUser = await user.findByPk(decoded.id);
  if (!newUser) {
    return next(new AppError("Invalid token or user does not exist.", 400));
  }

  newUser.password = newPassword;
  await newUser.save();

  res.status(200).json({ status:'success', message: "Password reset successfully." });
});

const authentication = catchAsync(async (req, res, next) => {
  if(!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return next(new AppError("Authorization header is required.", 400));
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new AppError("Token is required.", 400));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.user_id) {
      return next(new AppError("Invalid token payload.", 400));
    }

    const newUser = await user.findByPk(decoded.user_id);
    if (!newUser) {
      return next(new AppError("Invalid token or user does not exist.", 400));
    }

    req.user = newUser;
    next();
  } catch (error) {
    return next(new AppError("Invalid token.", 400));
  }
});

module.exports = { signUp, EmailVerification, login, forgotPassword, resetPassword, authentication };