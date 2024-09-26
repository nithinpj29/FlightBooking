import { configureStore } from '@reduxjs/toolkit';
import flightReducer from './../components/FlightList/flightSlice';
import AuthReducer from './../components/Login/authSlice'
import profileReducer from './../components/Profile/ProfileSlice'

const store = configureStore({
  reducer: {
    flights: flightReducer,
    auth:AuthReducer,
    profile:profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
