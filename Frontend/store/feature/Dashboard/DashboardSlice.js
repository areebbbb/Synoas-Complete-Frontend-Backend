import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  City: null,
  Country: null,
  ISP: null,
  IP: null,
  Latitude: null,
  Longitude: null,
  Timezone: null,
  Weather: null,
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setGeolocation: (state, action) => {
      state.Geolocation = action.payload;
    },
    setCity: (state, action) => {
      state.City = action.payload;
    },
    setCountry: (state, action) => {
      state.Country = action.payload;
    },
    setISP: (state, action) => {
      state.ISP = action.payload;
    },
    setIP: (state, action) => {
      state.IP = action.payload;
    },
    setLatitude: (state, action) => {
      state.Latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.Longitude = action.payload;
    },
    setTimezone: (state, action) => {
      state.Timezone = action.payload;
    },
    setWeather: (state, action) => {
      state.Weather = action.payload;
    },
  },
});

export const DashboardActions = DashboardSlice.actions;
export const DashboardSelector = (state) => state.dashboard;
export default DashboardSlice.reducer;
