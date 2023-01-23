import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchBooking } from '../slices/bookingSlice';
import { Store } from "../store/storeModel";

export function CreatedBookingPage() {
  const dispatch = useDispatch<any>();

  const [bookingId, setBookingId] = useState<string>('');
  const [showBooking, setShowBooking] = useState<boolean>(false);

  const booking = useSelector((store: Store) => store.createdBookings.booking);

  const findBooking = () => { 
    setShowBooking(true);
    dispatch(fetchBooking(bookingId));
}


  return (
    <div>
      <p>Find your booking: </p>
      <input type="text" name="bookingId" onChange={(event) => setBookingId(event.target.value)}></input>
      {showBooking && booking.bookingId && <p>{JSON.stringify(booking)}</p>}
      <button onClick={findBooking}>Find!</button>
    </div>
  );
}