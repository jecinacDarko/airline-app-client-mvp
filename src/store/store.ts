import cityReducer from '../slices/citySlice';
import flightReducer from '../slices/flightSlice';
import bookingReducer from '../slices/currentBookingSlice';
import createdBookingReducer from '../slices/bookingSlice';

import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        cities: cityReducer,
        flights: flightReducer,
        bookings: bookingReducer,
        createdBookings: createdBookingReducer
    }
})