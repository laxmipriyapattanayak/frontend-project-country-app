import { createSlice } from '@reduxjs/toolkit'

interface FavoriteState {
    favorite: []
}

const initialState: FavoriteState = {
    favorite: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    update: (state: any, action: {payload: {index: number}}) => {
        const {index} = action.payload
        const trueOrFalse = state.favorite[index] ? false : true
        //add country details as well
        state.favorite[index] = trueOrFalse
    },
  },
})

export const { update } = favoriteSlice.actions

export default favoriteSlice.reducer