import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {CountryState, Country} from '../types/Types';

import 'react-toastify/dist/ReactToastify.css';

export const fetchCountries: any = createAsyncThunk( "countries/fetchCountries", async () => {
    const res = await axios.get(`https://restcountries.com/v3.1/all`);
    return res.data.map((country: any, index: number) => {
        return {...country, isFav: false}
    });
})

export const countrySearch: any = createAsyncThunk( "countries/countrySearch", async (name: string) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return res.data.map((country: any, index: number) => {
        return {...country, isFav: false}
    });
})

export const countrySearchByName: any = createAsyncThunk( "countries/countrySearchByName", async (name: any ) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return res.data
})

const mapFavoriteCountry = (newlyFetchCountry: Country[], favoriteCountry: Country[]) => {
    return newlyFetchCountry.map((country: Country) => {
        country["isFav"] = favoriteCountry?.find((countryData: Country) => countryData.cca3 === country.cca3) ? true : false
        return country;
    })
}

const initialState = {
    countriesData: [],
    loading: true,
    originalData: [],
    favoriteCountry: [],
} as CountryState

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        markFavorite : (state, action) => {

            state.countriesData = state.countriesData.map((country:Country) => {
                if(country.cca3 === action.payload) {
                    country.isFav ? country['isFav'] = false : country['isFav'] = true ;
                }
                return country;
            })
            
            state.favoriteCountry = state.countriesData.filter((country: any) => country.isFav).map((country: any)=> country)
        },
        sorting : (state, action) => {
            state.originalData = action.payload;
            state.countriesData = [...action.payload].sort((elementOne,elementTwo) => elementOne.name.common.localeCompare(elementTwo.name.common))
        },
        reset : (state) => {
            state.countriesData = state.originalData;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCountries.fulfilled,(state, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = mapFavoriteCountry(action.payload, state.favoriteCountry);
        });
        builder.addCase(fetchCountries.pending,(state, action)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(fetchCountries.rejected,(state, action)=>{
            state.loading = false
            state.countriesData = []
        });
        builder.addCase(countrySearch.fulfilled,(state, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = mapFavoriteCountry(action.payload, state.favoriteCountry);
        });
        builder.addCase(countrySearch.pending,(state, action)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(countrySearch.rejected,(state, action)=>{
            state.loading = false
            state.countriesData = []
        });
        builder.addCase(countrySearchByName.fulfilled,(state, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = action.payload;
        });
        builder.addCase(countrySearchByName.pending,(state, action)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(countrySearchByName.rejected,(state, action)=>{
            state.loading = false
            state.countriesData = []
        });
    },
});
export const { sorting, reset, markFavorite } = countrySlice.actions
export default countrySlice.reducer;