require('dotenv').config();
const PaymentHistory = require('../models/PaymentHistory');
const Event = require('../models/Event');


const CLIENT_URL= process.env.CLIENT_URL || 'http://localhost:5175'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Create a Checkout Session
const checkoutSession = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.userId;
  
  // Ensure userId and eventId are populated
  if (!userId || !eventId) {
    return res.status(400).json({ message: 'User ID and Event ID are required' });
  }
  
  const event = await Event.findById({ _id: eventId });
  if (!event) {
    return res.status(404).json({ message: 'Event not found' }); 
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: event.title },
        unit_amount: event.price * 100,
      },
      quantity: 1,
    }],
    metadata: { userId,
      eventId,
     },
    success_url: `${CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${CLIENT_URL}/cancel`,
  });

  // 📝 Save the order in MongoDB
  await PaymentHistory.create({
    user_id : userId,
    event_id : eventId,
    amount: event.price,
    sessionId: session.id,
    status: 'pending',
  });

  res.json({ url: session.url });
};

const webhook = async (req, res) => {
  console.log('Webhook received!');
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Move this to .env file

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      try {
        await PaymentHistory.findOneAndUpdate(
          { sessionId: session.id },
          { status: 'completed' }
        );
        await Event.findByIdAndUpdate(
          { _id: session.metadata.eventId },
          { $addToSet: { attendees: session.metadata.userId } }
        );
        console.log('🎉 Payment marked as completed!');
      } catch (error) {
        console.error('Error updating payment:', error);
        return res.status(500).send('Error updating payment status');
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};


module.exports = {
  checkoutSession,
  webhook
};