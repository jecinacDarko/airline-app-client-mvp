import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import flightBloc from "../blocs/flightBloc"
import { SearchDTO } from "../models/SearchDTO"
import { SearchResponse } from "../models/SearchResponse";
import { FlightState } from "../store/storeModel";
import { flightToIFlight } from "../util/interfaceUtil";

const initialState: FlightState = {
    directFlights: [],
    returnFlights: []
};

export const searchFlights = createAsyncThunk(
    'flights/search', 
    async (searchDTO: SearchDTO) => await flightBloc.searchFlights(searchDTO) as SearchResponse
);

const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(searchFlights.fulfilled, (state, { payload }) => {
            state.directFlights = payload.directFlights.map(flight => flightToIFlight(flight));
            state.returnFlights = payload.returnFlights.map(flight => flightToIFlight(flight));
        });
    }
});

export default flightSlice.reducer;