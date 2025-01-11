const { sendEmail } = require("./email.services");

const verifyEmail = async (username, verificationLink, email) => {
  const mailText = `Hi ${username},\n\nPlease click the link below to verify your email:\n${verificationLink}\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>Please click the link below to verify your email:</p><a href="${verificationLink}" target="_blank" rel="noopener noreferrer">Verify Email</a><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Email Verification", mailText, mailBody);
};

const registrationEmail = async (username, email) => {
  const mailText = `Hi ${username},\n\nYour account has been successfully verified.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>Your account has been successfully verified.</p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Email Verification", mailText, mailBody);
};

const passwordResetEmail = async (email, username, resetLink) => {
  console.log("🚀 ~ passwordResetEmail ~ email, username, resetLink:", email, username, resetLink)
  const mailText = `Hi ${username},\n\nPlease click the link below to reset your password:\n${resetLink}\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>Please click the link below to reset your password:</p><a href="${resetLink}" target="_blank" rel="noopener noreferrer">Reset Password</a><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Password Reset", mailText, mailBody);
};

module.exports = { verifyEmail, registrationEmail, passwordResetEmail };
