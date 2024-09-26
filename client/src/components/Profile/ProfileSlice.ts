import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from"./../../config"
interface FlightState {
  flights: any[];
  allconformed: any[];
  loading: boolean;
  error: string | null;
}

interface BookParams {
  airline: string;
  arrivalDate: string;
  arrivalPlace: string;
  arrivalTime: string;
  departureDate: string;
  departurePlace: string;
  departureTime: string;
  price: string;
}
interface FlightDetails {
  airline: string;
  departurePlace: string;
  departureDate: string;
  departureTime: string;
  arrivalPlace: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
}
interface FlightDeleteID{
  id:string;
}

const initialState: FlightState = {
  flights: [],
  allconformed: [],
  loading: false,
  error: null,
};

export const fetchBookedFlights = createAsyncThunk(
  'flights/fetchBookedFlights',
  async () => {
    const response = await axios.get("http://localhost:8080/api/bookedflights",config);
    return response.data;
  }
);

export const conformBooking = createAsyncThunk(
  'flights/conformBooked',
  async (bookParams: BookParams) => {
    const response = await axios.post("http://localhost:8080/api/conformbook", bookParams,config);
    return response.data;
  }
);

export const flightDelete = createAsyncThunk(
  'flights/flightDelete',
  async (flightId: FlightDeleteID) => {
    console.log("iddd",flightId)
    const response = await axios.delete(`http://localhost:8080/api/flight/${flightId.id}` ,config);
    return response.data;
  }
);
export const flightUpdate = createAsyncThunk(
  'flights/flightUpdate',
  async ({ flightId, updatedFlightData }: { flightId: string; updatedFlightData: FlightDetails }) => {
    console.log("iddd", flightId,updatedFlightData);
    const response = await axios.put(`http://localhost:8080/api/flight/${flightId}`, updatedFlightData,config);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookedFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookedFlights.fulfilled, (state, action) => {
        state.loading = false;
        state.flights = action.payload;
      })
      .addCase(fetchBookedFlights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch flights';
      })
      .addCase(conformBooking.fulfilled, (state,action) => {
        // After booking, no need to modify `flights` directly, let fetchBookedFlights handle it
        state.loading = false;
        state.allconformed=action.payload
        state.flights=action.payload
      });
  },
});

export default profileSlice.reducer;
