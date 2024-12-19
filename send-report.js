const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function sendTestReport() {
  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email provider
    auth: {
      user: 'ankur.sharma@comprotechnologies.com',
      pass: 'sxqj xbjh jsng uzxu', // This is a gmail account password generated via gmail account settings
    },
  });

  // Path to the report
  const reportPath = path.join(__dirname, 'cypress/reports/report.pdf');

  if (!fs.existsSync(reportPath)) {
    console.error('Report file not found at:', reportPath);
    return;
  }

  // Email options
  const mailOptions = {
    from: 'ankur.sharma@comprotechnologies.com',
    to: 'ankur.nitj.13@gmail.com',
    subject: 'Cypress Test Results',
    text: 'Attached is the Cypress test result report.',
    attachments: [
      {
        filename: 'reports.zip',
        path: reportPath,
      },
    ],
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Test report emailed successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestReport();
