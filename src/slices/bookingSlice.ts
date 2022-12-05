import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BookingDTO } from "../models/BookDTO";
import { CreatedBookingState } from "../store/storeModel";
import { createdBookingToICreatedBooking } from "../util/interfaceUtil";
import bookingBloc from "../blocs/bookingBloc";

const initialState: CreatedBookingState = {
    booking: {
        bookingId: '', 
        booking: {
            flightTo: {
                flight_id: '',
                depatureAt: new Date(0).toJSON(),
                arriveAt: new Date(0).toJSON()
            },
            childPassengers: [],
            adultPassengers: []
        }
    },
    error: ''
};

export const fetchBooking = createAsyncThunk('createdBooking/fetch', async (bookingId: string) => {
    return await bookingBloc.getBooking(bookingId);
});

export const createBooking = createAsyncThunk(
    'createdBooking/book', 
    async (bookingDTO: BookingDTO) => await bookingBloc.bookFlight(bookingDTO)
);

const createdBookingSlice = createSlice({
    name: 'createdBooking',
    initialState,
    reducers: {
        resetBookingState(state) {
            console.log(state);
            state = initialState;
            console.log(state);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooking.fulfilled, (state, { payload }) => {
            state.booking = createdBookingToICreatedBooking(payload);
        })

        builder.addCase(createBooking.fulfilled, (state, { payload }) => {
            console.log(payload);
            state.booking = createdBookingToICreatedBooking(payload);
        });

        builder.addCase(createBooking.rejected, (state, action ) => {
            if (action.payload) {
                state.error = action.payload.toString();
            }
        });
    }
});

export const { resetBookingState } = createdBookingSlice.actions;
export default createdBookingSlice.reducer;