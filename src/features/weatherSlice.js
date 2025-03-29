import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  unit: 'metric', 
  favoriteCities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    addFavoriteCity: (state, action) => {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity: (state, action) => {
      state.favoriteCities = state.favoriteCities.filter(
        city => city !== action.payload
      );
    },
  },
});

export const { setUnit, addFavoriteCity, removeFavoriteCity } = weatherSlice.actions;
export default weatherSlice.reducer;
