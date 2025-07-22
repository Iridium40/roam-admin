import { supabase } from '@/lib/supabase';
// import stripe from '@/lib/stripe'; // Uncomment and configure if you have a stripe helper

export default async function handler(req, res) {
  const { id: bookingId } = req.query;
  const { notes } = req.body;

  try {
    // Get booking details
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    // Get provider's Stripe connected account
    const { data: provider } = await supabase
      .from('business_profiles')
      .select('stripe_connect_account_id')
      .eq('id', booking.provider_id)
      .single();

    // Charge service fee to customer (stub)
    // const serviceFeeIntent = await stripe.paymentIntents.create({ ... });

    // Update booking status and payment record
    await supabase
      .from('bookings')
      .update({
        booking_status: 'accepted',
        service_fee_charged: true,
        service_fee_charged_at: new Date().toISOString(),
        provider_notes: notes,
        accepted_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    // Record payment transaction (stub)
    // await supabase.from('payment_transactions').insert({ ... });

    // Send confirmation to customer (stub)
    // await sendCustomerNotification(booking.customer_id, 'booking_accepted', booking);

    res.status(200).json({ 
      success: true,
      message: 'Booking accepted and service fee charged (stub)'
    });
  } catch (error) {
    console.error('Booking acceptance error:', error);
    res.status(500).json({ error: 'Failed to accept booking' });
  }
} 