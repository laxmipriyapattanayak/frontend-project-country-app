import { createSlice } from '@reduxjs/toolkit'

interface FavoriteState {
  favoriteValue: []
}

const initialState: FavoriteState = {
    favoriteValue: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    update: (state: any, action: {payload: {index: number,country:any}}) => {
        const {index,country} = action.payload
        const trueOrFalse = state.favoriteValue[index]?.fav ? false : true
        //add country details as well
        state.favoriteValue[index] = {country: country,fav: trueOrFalse}
        console.log(state.favoriteValue[index]);
    },
  },
})

export const { update } = favoriteSlice.actions

export default favoriteSlice.reducer