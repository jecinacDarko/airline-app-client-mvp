import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cityBloc from "../blocs/cityBloc";
import { CityState } from "../store/storeModel";

const initialState: CityState = {
    cities: []
};

export const fetchCities = createAsyncThunk('city/fetch', async () => {
    return await cityBloc.getCities();
});

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCities.fulfilled, (state, { payload }) => {
            state.cities = payload;
        })
    }
});

export default citySlice.reducer;