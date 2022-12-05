import { createSlice } from "@reduxjs/toolkit";
import { BookingState } from "../store/storeModel";

const initialState: BookingState = {
    oneWay: false,
    numberOfAdults: 0,
    numberOfChildren: 0,
    toItinerary: {
        arriveAt: new Date(0).toJSON(), 
        depatureAt: new Date(0).toJSON(), 
        avaliableSeats: 0, 
        prices: [], 
        flightId: ''
    },
    fromItinerary: {
        arriveAt: new Date(0).toJSON(), 
        depatureAt: new Date(0).toJSON(), 
        avaliableSeats: 0, 
        prices: [], 
        flightId: ''
    },
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setNumberOfAdults(state, { payload }) {
            state.numberOfAdults = payload;
        },
        setNumberOfChildren(state, { payload }) {
            state.numberOfChildren = payload;
        },
        setOneWay(state, { payload }) {
            state.oneWay = payload;
        },
        setToItinerary(state, { payload }) {
            state.toItinerary = payload;
        },
        setFromItinerary(state, { payload }) {
            state.fromItinerary = payload;
        },
        resetState(state) {
            state.toItinerary = {
                arriveAt: new Date(0).toJSON(), 
                depatureAt: new Date(0).toJSON(), 
                avaliableSeats: 0, 
                prices: [], 
                flightId: ''
            };
            state.fromItinerary = {
                arriveAt: new Date(0).toJSON(), 
                depatureAt: new Date(0).toJSON(), 
                avaliableSeats: 0, 
                prices: [], 
                flightId: ''
            };
        }
    }
});

export const { setNumberOfAdults, setNumberOfChildren, setOneWay, setToItinerary, setFromItinerary, resetState } = bookingSlice.actions;
export default bookingSlice.reducer;