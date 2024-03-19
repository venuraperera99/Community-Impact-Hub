require("dotenv").config()

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const stripe = require('stripe')("sk_test_51O0uCSLK717y4J2bjhRqVXM4TbF77EJGVWLhfnnSeuKpmuTJC2RuwyfLe3IDUPWJRZsQE2eG7iuJpKNuk651suG400vb72RWwC")

const storeItems = new Map([
  [1, { priceInCents: 19900, name: "Week 1"}],
  [2, { priceInCents: 19900, name: "Week 2"}],
  [3, { priceInCents: 19900, name: "Week 3"}],
  [4, { priceInCents: 19900, name: "Week 4"}],
  [5, { priceInCents: 19900, name: "Week 5"}],
  [6, { priceInCents: 19900, name: "Week 6"}],
  [7, { priceInCents: 49900, name: "All Weeks Bundle"}]
])

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      }),
      success_url: `http://localhost:3000/payment-success`,
      cancel_url: "http://localhost:3000/child-registration"
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})


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
      pass: 'oaub ntsn ooet lcvx'
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
