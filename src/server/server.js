const dotenv = require('dotenv').config();
const path = require('path');
//const envPath = path.resolve(__dirname, '../../.env');
//dotenv.config({ path: envPath });
const mysql = require('mysql'); // Import the MySQL package

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();

app.use(bodyParser.json());
app.use(cors()); 

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


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
      automatic_tax: {
        enabled: true,
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/child-registration`,

    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({error: e.message})
  }
})


// This is the success route where Stripe will redirect after successful payment
app.get('/payment-success', async (req, res) => {
  const { session_id } = req.query;
  
  try {
    // Retrieve the session to get payment details
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Get the items the customer purchased
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    // Get the customer email from the session
    const customer_email = session.customer_details.email;
    console.log(session)
    console.log(lineItems)
    console.log(customer_email)
    // Send invoice email
    await sendInvoiceEmail(customer_email, session, lineItems.data);

    res.send('Invoice email sent successfully!');
  } catch (error) {
    console.error('Error sending invoice email:', error.message);
    res.status(500).send('Error sending invoice email');
  }
});

// Function to send invoice email
async function sendInvoiceEmail(customerEmail, session, lineItems) {
  const lineItemsHTML = lineItems.map(item => {
    return `<li>${item.quantity} x ${item.description} - ${formatCurrency(item.amount_total, session.currency)}</li>`;
  }).join('');

  const mailOptions = {
    from: {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: 'Community Impact Hub'
    },
    to: customerEmail,
    subject: 'Invoice for Your Purchase',
    html: `
      <h1>Thank you for your purchase!</h1>
      <p>Here is your invoice for the items:</p>
      <ul>
        ${lineItemsHTML}
      </ul>
      <p>Total: ${formatCurrency(session.amount_total, session.currency)}</p>
      <p>Payment Status: ${session.payment_status}</p>
    `
  };

  try {
    await sgMail.send(mailOptions);
    console.log('Invoice email sent successfully');
  } catch (error) {
    console.error('Error sending invoice email:', error.toString());
  }
}

// Helper function to format currency
function formatCurrency(amount, currency) {
  if (currency.toUpperCase() === 'CAD') {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount / 100);
  } else {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100);
  }
}

app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  let event;
  try {
    // Verify the webhook signature using your webhook signing secret
    // const sig = req.headers['stripe-signature'];
    // event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_WEBHOOK_SIGNING_SECRET');

    // For testing locally without webhook signature verification
    event = req.body;

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const session_id = session.id;
      
      // Retrieve the session to get payment details
      const retrievedSession = await stripe.checkout.sessions.retrieve(session_id);
      
      // Get the line items
      const lineItems = retrievedSession.display_items;

      // Get the customer email
      const customer_email = retrievedSession.customer_details.email;

      // Perform further actions with this data
      console.log('Session ID:', session_id);
      console.log('Line Items:', lineItems);
      console.log('Customer Email:', customer_email);

      // Send confirmation email, update database, etc.

      res.status(200).end();
    } else {
      // Handle other webhook events if needed
      console.log('Unhandled event type:', event.type);
      res.status(200).end();
    }
  } catch (err) {
    console.error('Error handling webhook event:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});



// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1',
  database: 'your_database_name',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Route to add data to MySQL
app.post('/api/add-data', (req, res) => {
  const {
    childName,
    age,
    parentName,
    email,
    phone,
    selectedWeeks,
    emergencyContact,
    emergencyContactNumber,
  } = req.body;

  const insertQuery = `
    INSERT INTO child_registrations 
    (childName, age, parentName, email, phone, selectedWeeks, emergencyContact, emergencyContactNumber) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    childName,
    age,
    parentName,
    email,
    phone,
    JSON.stringify(selectedWeeks), // Convert to JSON string before storing in TEXT field
    emergencyContact,
    emergencyContactNumber,
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Error inserting data into MySQL' });
      return;
    }
    console.log('Data inserted into MySQL successfully!');
    res.status(200).json({ message: 'Data inserted into MySQL successfully' });
  });
});



const { body, validationResult } = require('express-validator');

// Twilio SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST endpoint to send email
app.post('/api/send-email', [
  body('fullName').notEmpty(),
  body('email').isEmail(),
  body('phoneNumber').notEmpty(),
  body('message').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, phoneNumber, message } = req.body;

  const msg = {
    to: process.env.SENDGRID_SENDER_EMAIL,
    from: {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: 'CONTACT US FORM SUBMISSION',
    },
    subject: 'New Contact Form Submission',
    html: `
      <h3>Contact Details:</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.toString());
    res.status(500).json({ error: 'Error sending email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});