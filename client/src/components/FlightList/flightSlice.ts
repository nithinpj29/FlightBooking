// flightSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface FlightState {
  flights: any[];
  loading: boolean;
  error: string | null;
}
interface SearchParams {
  departureLocation: string;
  arrivalLocation: string;
  departureTime: string;
  passengers: number;
  returnDate?: string;
  flightClass: string
}

const initialState: FlightState = {
  flights: [],
  loading: false,
  error: null,
};

export const fetchFlights = createAsyncThunk(
  'flights/fetchFlights',
  async (searchParams: SearchParams) => {
    const response = await axios.get("http://localhost:8080/api/availableflight")
    return response.data;
  }
);

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch flights';
      });
  },
});

export default flightSlice.reducer;
