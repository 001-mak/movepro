import nodemailer from 'nodemailer';

// Create reusable transporter object using Gmail
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USERNAME, // Your Gmail email address
    pass: process.env.SMTP_PASSWORD, // App Password (generated in your Google account)
  },
});

// Function to send email
export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.SMTP_USERNAME, // Sender address (your Gmail)
    to, // Receiver's email
    subject, // Subject of the email
    text, // Text content (you can also use 'html' for HTML emails)
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
