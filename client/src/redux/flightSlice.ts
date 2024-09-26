import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  seatsAvailable: number;
}

interface FlightState {
  flights: Flight[];
}

const initialState: FlightState = {
  flights: [],
};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlights(state, action: PayloadAction<Flight[]>) {
      state.flights = action.payload;
    },
  },
});

export const { setFlights } = flightSlice.actions;
export default flightSlice.reducer;
