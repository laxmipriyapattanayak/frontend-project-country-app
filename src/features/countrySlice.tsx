import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface CountryState {
    countriesData: [],
    originalData: [],
    loading: boolean
}

interface Country {
    id: number;
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
    
        const mCountry = {...country, id: index, isFav: false}
        return mCountry;
    });
})

export const fetchCountriesByName: any = createAsyncThunk( "countries/fetchCountriesByName", async (name: string) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    return res.data.map((country: any, index: number) => {
        const mCountry = {...country, id: index, isFav: false}
        return mCountry;
    });
})

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
                if(country.id === action.payload) {
                    country.isFav ? country['isFav'] = false : country['isFav'] = true ;
                }
                return country;
            })

            localStorage.setItem('favorite', JSON.stringify(state.countriesData.map((country:any)=>{
                return {id: country.id , isFav: country.isFav}
            })));

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
        builder.addCase(fetchCountries.fulfilled,(state: any, action: {payload: Country})=>{
            state.loading = false
            state.countriesData = action.payload
        });
        builder.addCase(fetchCountries.pending,(state: any, action: any)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(fetchCountries.rejected,(state: any, action: any)=>{
            state.loading = false
            state.countriesData = []
        });
        builder.addCase(fetchCountriesByName.fulfilled,(state: any, action: {payload: Country})=>{
            state.loading = false
            state.countriesData = action.payload
        });
        builder.addCase(fetchCountriesByName.pending,(state: any, action: any)=>{
            state.loading = true
            state.countriesData = []
        });
        builder.addCase(fetchCountriesByName.rejected,(state: any, action: any)=>{
            state.loading = false
            state.countriesData = []
        });
    },
});
export const { sorting, reset, markFavorite } = countrySlice.actions
export default countrySlice.reducer;


