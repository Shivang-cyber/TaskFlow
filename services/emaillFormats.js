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
  const mailText = `Hi ${username},\n\nPlease click the link below to reset your password:\n${resetLink}\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>Please click the link below to reset your password:</p><a href="${resetLink}" target="_blank" rel="noopener noreferrer">Reset Password</a><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Password Reset", mailText, mailBody);
};

const projectInvitationNotification = async (username, email, projectName, acceptLink) => {
  const mailText = `Hi ${username},\n\nYou have been invited to the project ${projectName}.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>You have been invited to the project ${projectName}.</p><p><a href="${acceptLink}" target="_blank" rel="noopener noreferrer">Accept Invitation</a></p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Project Invitation", mailText, mailBody);
};

const projectAssignedNotification = async (username, email, projectName) => {
  const mailText = `Hi ${username},\n\nYou have been added to the project ${projectName}.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>You have been added to the project ${projectName}.</p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Project Invitation", mailText, mailBody);
};

const projectRemovedNotification = async (username, email, projectName) => {
  const mailText = `Hi ${username},\n\nYou have been removed from the project ${projectName}.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>You have been removed from the project ${projectName}.</p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Project Notification", mailText, mailBody);
};

const taskAssignedNotification = async (
  username,
  email,
  taskTitle,
  projectName
) => {
  const mailText = `Hi ${username},\n\nYou have been assigned the task ${taskTitle} in the project ${projectName}.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>You have been assigned the task ${taskTitle} in the project ${projectName}.</p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Task Assignment", mailText, mailBody);
};

const taskUpdatedNotification = async (
  username,
  email,
  taskTitle,
  projectName
) => {
  const mailText = `Hi ${username},\n\nThe task ${taskTitle} in the project ${projectName} has been updated.\n\nBest regards,\nThe TaskFlow Team`;
  const mailBody = `<p>Hi ${username},</p><p>The task ${taskTitle} in the project ${projectName} has been updated.</p><p>Best regards,<br>The TaskFlow Team</p>`;
  await sendEmail(email, "Task Update", mailText, mailBody);
};

module.exports = {
  verifyEmail,
  registrationEmail,
  passwordResetEmail,
  projectInvitationNotification,
  projectAssignedNotification,
  projectRemovedNotification,
  taskAssignedNotification,
  taskUpdatedNotification,
};
