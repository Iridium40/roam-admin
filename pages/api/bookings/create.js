import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { serviceId, providerId, datetime, addons, customerInfo, totalAmount } = req.body;

  try {
    // Calculate pricing breakdown
    const serviceFee = totalAmount * 0.15; // 15% to ROAM
    const remainingBalance = totalAmount - serviceFee;

    // Create booking record
    const { data: booking, error } = await supabase
      .from('bookings')
      .insert({
        service_id: serviceId,
        provider_id: providerId,
        booking_date: datetime.date,
        start_time: datetime.time,
        total_amount: totalAmount,
        service_fee: serviceFee,
        remaining_balance: remainingBalance,
        booking_status: 'pending',
        ...customerInfo
      })
      .select()
      .single();

    if (error) throw error;

    // Add selected add-ons
    if (addons && addons.length > 0) {
      const addonRecords = addons.map(addon => ({
        booking_id: booking.id,
        addon_id: addon.id,
        addon_name: addon.name,
        addon_price: addon.price,
        duration_minutes: addon.duration_minutes
      }));
      await supabase.from('booking_addons').insert(addonRecords);
    }

    // Schedule future payment for remaining balance (24 hours before service)
    const serviceDateTime = new Date(`${booking.booking_date}T${booking.start_time}`);
    const chargeDateTime = new Date(serviceDateTime.getTime() - (24 * 60 * 60 * 1000));
    if (chargeDateTime > new Date()) {
      await supabase.from('payment_schedules').insert({
        booking_id: booking.id,
        payment_type: 'remaining_balance',
        scheduled_at: chargeDateTime.toISOString(),
        amount: remainingBalance,
        status: 'scheduled'
      });
    }

    // Send notification to provider (stub)
    // await sendProviderNotification(providerId, 'new_booking', booking);

    res.status(200).json({ 
      booking,
      message: 'Booking created successfully. Service fee will be charged when provider accepts.' 
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
} 