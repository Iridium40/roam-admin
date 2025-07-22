import { supabase } from '@/lib/supabase';
// import stripe from '@/lib/stripe'; // Uncomment and configure if you have a stripe helper

export default async function handler(req, res) {
  const { id: bookingId } = req.query;
  const { addonId, customPrice } = req.body;

  try {
    // Get booking and addon details
    const { data: booking } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    const { data: addon } = await supabase
      .from('service_addons')
      .select('*')
      .eq('id', addonId)
      .single();

    const addonPrice = customPrice || addon.price;

    // Charge customer for the add-on (stub)
    // const paymentIntent = await stripe.paymentIntents.create({ ... });

    // Add addon to booking
    await supabase.from('booking_addons').insert({
      booking_id: bookingId,
      addon_id: addonId,
      addon_name: addon.name,
      addon_price: addonPrice,
      duration_minutes: addon.duration_minutes,
      added_by: booking.customer_id
    });

    // Update booking total
    const newTotal = booking.total_amount + addonPrice;
    await supabase
      .from('bookings')
      .update({ 
        total_amount: newTotal,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    // Log the change (stub)
    // await supabase.from('booking_changes').insert({ ... });

    // Record transaction (stub)
    // await supabase.from('payment_transactions').insert({ ... });

    res.status(200).json({ 
      success: true,
      message: 'Add-on added and payment processed (stub)'
    });
  } catch (error) {
    console.error('Add-on addition error:', error);
    res.status(500).json({ error: 'Failed to add addon' });
  }
} 