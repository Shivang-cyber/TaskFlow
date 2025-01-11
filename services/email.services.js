const sgMail = require('@sendgrid/mail');
require("dotenv").config({path: `${process.cwd()}/.env`});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to,
    from: process.env.SENDGRID_USER_EMAIL, 
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new Error('Error sending email');
  }
};

module.exports = { sendEmail };
