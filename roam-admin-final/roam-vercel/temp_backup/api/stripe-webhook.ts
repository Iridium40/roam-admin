import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentSuccess(paymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await handlePaymentFailure(failedPayment);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.booking_id;
  
  if (!bookingId) {
    console.error('No booking ID found in payment intent metadata');
    return;
  }

  // Update booking status to paid
  const { error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'paid',
      payment_intent_id: paymentIntent.id,
      updated_at: new Date().toISOString()
    })
    .eq('booking_id', bookingId);

  if (error) {
    console.error('Error updating booking payment status:', error);
  } else {
    console.log(`Successfully updated booking ${bookingId} to paid status`);
  }
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata.booking_id;
  
  if (!bookingId) {
    console.error('No booking ID found in payment intent metadata');
    return;
  }

  // Update booking status to payment failed
  const { error } = await supabase
    .from('bookings')
    .update({
      payment_status: 'failed',
      payment_intent_id: paymentIntent.id,
      updated_at: new Date().toISOString()
    })
    .eq('booking_id', bookingId);

  if (error) {
    console.error('Error updating booking payment status:', error);
  } else {
    console.log(`Successfully updated booking ${bookingId} to failed payment status`);
  }
}
