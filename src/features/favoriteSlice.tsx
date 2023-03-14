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
    update: (state: any, action: {payload: {index: number}}) => {
        const {index} = action.payload
        const trueOrFalse = state.favoriteValue[index] ? false : true
        //add country details as well
        state.favoriteValue[index] = trueOrFalse
    },
  },
})

export const { update } = favoriteSlice.actions

export default favoriteSlice.reducer