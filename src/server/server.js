const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import CORS module
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// POST endpoint to send email
app.post('/api/send-email', (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'venura.perera1999@gmail.com',
      pass: 'password'
    }
  });

  // Setup email data
  let mailOptions = {
    from: 'acex2000@gmail.com',
    to: 'venura.perera1999@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Full Name: ${fullName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Message: ${message}
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
