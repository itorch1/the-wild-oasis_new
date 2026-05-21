import { isFuture, isPast, isToday } from 'date-fns';
import supabase from '../services/supabase';
import { subtractDates } from './helpers';

import { bookings } from '../data/data-bookings';
import { cabins } from '../data/data-cabins';

// Keep your helper functions exactly as they were
async function deleteBookings() {
   const { error } = await supabase.from('bookings').delete().gt('id', 0);
   if (error) console.error('Error deleting bookings:', error.message);
}

async function createBookings() {
   const { data: guestsIds } = await supabase.from('guests').select('id').order('id');
   const allGuestIds = guestsIds.map(guest => guest.id);

   const { data: cabinsIds } = await supabase.from('cabins').select('id').order('id');
   const allCabinIds = cabinsIds.map(cabin => cabin.id);

   const finalBookings = bookings.map(booking => {
      const cabin = cabins.at(booking.cabinId - 1);
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast ? numNights * 15 * booking.numGuests : 0;
      const totalPrice = cabinPrice + extrasPrice;

      let status;
      if (isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate))) status = 'checked-out';
      if (isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate))) status = 'unconfirmed';
      if (
         (isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) &&
         isPast(new Date(booking.startDate)) &&
         !isToday(new Date(booking.startDate))
      )
         status = 'checked-in';

      return {
         ...booking,
         numNights,
         cabinPrice,
         extrasPrice,
         totalPrice,
         guestId: allGuestIds.at(booking.guestId - 1),
         cabinId: allCabinIds.at(booking.cabinId - 1),
         status,
      };
   });

   const { error } = await supabase.from('bookings').insert(finalBookings);
   if (error) console.error('Error creating bookings:', error.message);
   else console.log('🎉 Bookings re-seeded successfully!');
}

// 💡 The Magic: Bundle them into a master function
export async function runBookingsSeeder() {
   console.log('⏳ Re-seeding bookings...');
   await deleteBookings();
   await createBookings();
}

// ⚠️ Only expose to the console if we are NOT in production
window.runBookingsSeeder = runBookingsSeeder;
