import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface CountryState {
    countriesData: [],
    originalData: [],
    favoriteCountry: [],
    loading: boolean
}

interface Country {
    cca3: string;
    flags: { png: string; alt: string};
    name: {common: string};
    region: string;
    population: number;
    languages?: { [key: string]: string };
    isFav: boolean;
}

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
        //return mCountry;
    });
})

export const countrySearchByName: any = createAsyncThunk( "countries/countrySearchByName", async (name: string) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    return res.data
})

const mapFavoriteCountry = (newlyFetchCountry: Country[], favoriteCountry: Country[]) => {
    return newlyFetchCountry.map((country: Country) => {
        country["isFav"] = favoriteCountry?.find((c: Country) => c.cca3 === country.cca3) ? true : false
        return country;
    })
}

const initialState = {
    countriesData: [],
    loading: true,
} as CountryState

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        markFavorite : (state: any, action: any) => {
            state.countriesData = state.countriesData.map((country:Country) => {
                if(country.cca3 === action.payload) {
                    country.isFav ? country['isFav'] = false : country['isFav'] = true ;
                }
                return country;
            })

            // maintain favorite country in a seperate state
            //TODO Fix for search
            state.favoriteCountry = state.countriesData.filter((country: any) => country.isFav).map((country: any)=> country)
        },
        sorting : (state: any, action: any) => {
            state.originalData = action.payload;
            state.countriesData = [...action.payload].sort((elementOne,elementTwo) => elementOne.name.common.localeCompare(elementTwo.name.common))
        },
        reset : (state: any) => {
            state.countriesData = state.originalData;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCountries.fulfilled,(state: any, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = mapFavoriteCountry(action.payload, state.favoriteCountry);
        });
        builder.addCase(fetchCountries.pending,(state: any, action: any)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(fetchCountries.rejected,(state: any, action: any)=>{
            state.loading = false
            state.countriesData = []
        });
        builder.addCase(countrySearch.fulfilled,(state: any, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = mapFavoriteCountry(action.payload, state.favoriteCountry);
        });
        builder.addCase(countrySearch.pending,(state: any, action: any)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(countrySearch.rejected,(state: any, action: any)=>{
            state.loading = false
            state.countriesData = []
        });
        builder.addCase(countrySearchByName.fulfilled,(state: any, action: {payload: Country[]})=>{
            state.loading = false
            state.countriesData = action.payload;
        });
        builder.addCase(countrySearchByName.pending,(state: any, action: any)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(countrySearchByName.rejected,(state: any, action: any)=>{
            state.loading = false
            state.countriesData = []
        });
    },
});
export const { sorting, reset, markFavorite } = countrySlice.actions
export default countrySlice.reducer;


