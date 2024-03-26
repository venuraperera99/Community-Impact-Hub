const dotenv = require('dotenv');
const path = require('path');
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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
      success_url: `${process.env.STRIPE_PRIVATE_KEY}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
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
  console.log(req)
  try {
    // Retrieve the session to get payment details
    const session = await stripe.checkout.sessions.retrieve(session_id);
    // Get the items the customer purchased
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id)
    console.log(lineItems)
    // Get the customer email from the session
    const customer_email = session.customer_details.email;
    console.log("hi")
    //console.log(customer_email, session)
    // Send invoice email
    await sendInvoiceEmail(customer_email, session, lineItems);

    res.send('Invoice email sent successfully!');
  } catch (error) {
    console.error('Error sending invoice email:', error.message);
    res.status(500).send('Error sending invoice email');
  }
});

// Function to send invoice email
async function sendInvoiceEmail(customerEmail, session, lineItems) {
  // Create a Nodemailer transporter
  //console.log(customerEmail, session)
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'venura.perera1999@gmail.com',
      pass: 'oaub ntsn ooet lcvx'
    }
  });

  // Create the line items list
  let lineItemsHTML = '';
  lineItems.data.forEach(item => {
    lineItemsHTML += `<li>${item.quantity} x ${item.description} - ${formatCurrency(item.amount_total, session.currency)}</li>`;
  });

  // Setup email data
  let mailOptions = {
    from: 'acex2000@gmail.com',
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
  console.log("heelo")
  // Send the email
  let info = await transporter.sendMail(mailOptions);
  console.log('Invoice email sent:', info.response);
}

// Helper function to format currency
function formatCurrency(amount, currency) {
  if (currency.toUpperCase() === 'CAD') {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount / 100);
  } else {
    // Default to en-US for other currencies
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