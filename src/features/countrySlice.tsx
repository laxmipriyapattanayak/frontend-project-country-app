import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CountryState {
    countriesData: []
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

interface Country {
    flags: { png: string; alt: string};
    name: {common: string};
    region: string;
    population: number;
    languages?: { [key: string]: string };
}

export const fetchCountries: any = createAsyncThunk( "countries/fetchCountries", async() => {
    const res = await axios.get(`https://restcountries.com/v3.1/all`);
    return res.data;
}) 

const initialState = {
    countriesData: [],
    loading: 'idle'
} as CountryState

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchCountries.fulfilled,(state: any, action: {payload: Country})=>{
            state.loding = 'succeeded'
            state.countriesData= action.payload
        });
        builder.addCase(fetchCountries.pending,(state: any, action: any)=>{
            state.loding = 'pending'
            state.countriesData = []
        });
        builder.addCase(fetchCountries.rejected,(state: any, action: any)=>{
            state.loding = 'failed'
            state.countriesData = []
        });
    },
});

export default countrySlice.reducer;


