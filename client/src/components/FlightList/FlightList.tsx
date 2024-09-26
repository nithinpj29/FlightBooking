import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from './flightSlice';
import { RootState, AppDispatch } from '../../redux/store';
import './FlightList.css'
interface FlightListProps {
    departureLocation: string;
    arrivalLocation: string;
    departureTime: string;
    passengers: number;
    returnDate?: string;
    handleState:any;
    flightClass:string
    showFilterSection:any;
  }

const FlightList:React.FC<FlightListProps> = ({
    departureLocation,
    arrivalLocation,
    departureTime,
    passengers,
    returnDate,
    handleState,
    flightClass,
    showFilterSection
}) => {
  const [searchParams, setSearchParams] = useState<any>({});
  //const [data,setData]=useState(null)
  const dispatch = useDispatch<AppDispatch>();
  //const { flights, loading, error } = useSelector((state: RootState) => state.flights);
  const flights = useSelector((state: RootState) => state.flights.flights);

 
        const handleBooking=(id:Number)=>{
          if(localStorage.getItem("userToken")){
            const bookingFlight = flights.find(flight => flight.id === id);
            localStorage.setItem("flightbook",JSON.stringify(bookingFlight))
            alert("please check profile and conform booking")
          }else{

            alert("please login first")
          }

        }
      
        useEffect(() => {
          dispatch(fetchFlights({
            departureLocation,
            arrivalLocation,
            departureTime,
            passengers,
            returnDate,
            flightClass
          }));
        }, [dispatch, departureLocation, arrivalLocation, departureTime, passengers, returnDate]);
          
        
  return (
    <div>
    
    
    <div>
      <h2>Available Flights</h2>
      <button className='btn2' onClick={showFilterSection}>Search by Filter?</button>
      <table>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Departure Plce</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Place</th>
            <th>Arival Date</th>
            <th>Arival Time</th>
            <th>Price</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
       
        {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.airline}</td>
              <td>{flight.departurePlace}</td>
              <td>{flight.departureDate}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.arrivalPlace}</td>
              <td>{flight.arrivalDate}</td>
              <td>{flight.arrivalTime}</td>
              <td>{flight.price}</td>
              <td>
                <button onClick={() => handleBooking(flight.id)}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  </div>
  )
}

export default FlightList