import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { conformBooking, fetchBookedFlights, flightDelete, flightUpdate } from "./ProfileSlice";
import { RootState, AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

interface FlightDetails {
  airline: string;
  departurePlace: string;
  departureDate: string;
  departureTime: string;
  arrivalPlace: string;
  arrivalDate: string;
  arrivalTime: string;
  price: number;
  _id?:string;
}

interface FlightDeleteID {
  id: string;
}

interface UserProfileProps {
  userEmail: string;
  flights: FlightDetails[];
}

const UserProfile: React.FC<UserProfileProps> = ({ userEmail, flights }) => {
  const [flightBook, setFlightBook] = useState<any>({});
  const [bookedFlight, setBookedFlight] = useState<any[]>([]);
  const [name, setUserName] = useState('');
  const [editingFlightId, setEditingFlightId] = useState<string | null>(null);
  const [updatedFlightData, setUpdatedFlightData] = useState<FlightDetails>({
    airline: '',
    departurePlace: '',
    departureDate: '',
    departureTime: '',
    arrivalPlace: '',
    arrivalDate: '',
    arrivalTime: '',
    price: 0,
  });
  
  const flightbook = localStorage.getItem("flightbook");
  const [showBookNew, setShowBookNew] = useState<boolean>(() => {
    return flightbook === null;
  });
  const [display, setDisplay] = useState(true);

  const { flights: allFlights, loading } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch booked flights on component mount
    dispatch(fetchBookedFlights());

    // Check if flight details exist in localStorage
    if (flightbook !== null) {
      const parsedFlightbook = JSON.parse(flightbook);
      setFlightBook(parsedFlightbook);
    }

    // Set user name from localStorage
    const userData = localStorage.getItem("user");
    const parsedUserData = userData ? JSON.parse(userData) : null;
    setUserName(parsedUserData);
  }, [dispatch, flightbook]);

  useEffect(() => {
    // Update booked flights when the state changes
    setBookedFlight(allFlights);
  }, [allFlights]);

  const bookHandler = async () => {
    // Dispatch action to confirm booking and update the state
    await dispatch(conformBooking(flightBook));
    // Fetch the updated booked flights list after confirmation
    dispatch(fetchBookedFlights());
    setDisplay(false);
    localStorage.removeItem("flightbook");
  };

  const backHandler = () => {
    navigate("/");
  };

  const editHandle = async (id: string, updatedFlightData: FlightDetails) => {
    console.log("Saved updated data:", updatedFlightData);
    await dispatch(flightUpdate({ flightId: id, updatedFlightData }));
    dispatch(fetchBookedFlights());
    setEditingFlightId(null); // Reset editing state after saving
  };

  const startEditing = (flight: FlightDetails) => {
    setEditingFlightId(flight._id as string); // Set the editing ID
    setUpdatedFlightData(flight);   // Initialize the updated flight data
  };
  const deleteHandle = async (id: string) => {
    const flightId: FlightDeleteID = { id }; // Create an object with the id field
    await dispatch(flightDelete(flightId)); 
    dispatch(fetchBookedFlights());
  };

  return (
    <>
      <div className="ticket-container">
        {showBookNew ? (
          <>
            <h1>Welcome {name}</h1>
            <br /><br />
            <button onClick={backHandler}>New book</button>
          </>
        ) : (
          display ? (
            <>
              <div className="ticket-header">
                <h2>Flight Ticket</h2>
                <p>Airline: <strong>{flightBook.airline}</strong></p>
              </div>
              <div className="ticket-body">
                <div className="ticket-info">
                  <div className="ticket-section">
                    <h3>Departure</h3>
                    <p>Place: <strong>{flightBook.departurePlace}</strong></p>
                    <p>Date: <strong>{flightBook.departureDate}</strong></p>
                    <p>Time: <strong>{flightBook.departureTime}</strong></p>
                  </div>
                  <div className="ticket-section">
                    <h3>Arrival</h3>
                    <p>Place: <strong>{flightBook.arrivalPlace}</strong></p>
                    <p>Date: <strong>{flightBook.arrivalDate}</strong></p>
                    <p>Time: <strong>{flightBook.arrivalTime}</strong></p>
                  </div>
                </div>
                <div className="ticket-price">
                  <h3>Price</h3>
                  <p><strong>${flightBook.price}</strong></p>
                </div>
              </div>
              <button onClick={bookHandler}>Confirm Booking</button>
            </>
          ) : (
            <>
              <br />
              <div>
                <h1>Successfully Booked</h1>
              </div>
              <br />
              <button onClick={backHandler}>Back To Search</button>
            </>
          )
        )}
      </div>

      <div className="booked-flights-container">
        <h2>Booked Flights</h2>
        <table className="flights-table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Departure Place</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Arrival Place</th>
              <th>Arrival Date</th>
              <th>Arrival Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookedFlight.map((flight, index) => (
              <tr key={index}>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="text" 
                    value={updatedFlightData?.airline !== undefined ? updatedFlightData.airline : flight.airline}

                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, airline: e.target.value })} 
                  />
                ) : (
                  flight.airline
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="text" 
                    value={updatedFlightData?.departurePlace!== undefined ? updatedFlightData.departurePlace : flight.departurePlace}
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, departurePlace: e.target.value })} 
                  />
                ) : (
                  flight.departurePlace
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="date" 
  
                    value={updatedFlightData?.departureDate!== undefined ? updatedFlightData.departureDate : flight.departureDate}
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, departureDate: e.target.value })} 
                  />
                ) : (
                  flight.departureDate
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="time" 
                
                    value={updatedFlightData?.departureTime!== undefined ? updatedFlightData.departureTime : flight.departureTime}
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, departureTime: e.target.value })} 
                  />
                ) : (
                  flight.departureTime
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="text" 
            
                    value={updatedFlightData?.arrivalPlace!== undefined ? updatedFlightData.arrivalPlace : flight.arrivalPlace}
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, arrivalPlace: e.target.value })} 
                  />
                ) : (
                  flight.arrivalPlace
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="date" 
                  
                    value={updatedFlightData?.arrivalDate!== undefined ? updatedFlightData.arrivalDate : flight.arrivalDate}
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, arrivalDate: e.target.value })} 
                  />
                ) : (
                  flight.arrivalDate
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="time" 
                
                    value={updatedFlightData?.arrivalTime!== undefined ? updatedFlightData.arrivalTime : flight.arrivalTime} 
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, arrivalTime: e.target.value })} 
                  />
                ) : (
                  flight.arrivalTime
                )}</td>
                <td>{editingFlightId === flight._id ? (
                  <input 
                    type="number" 
                    
                    value={updatedFlightData?.price!== undefined ? updatedFlightData.price : flight.price} 
                    onChange={(e) => setUpdatedFlightData({ ...updatedFlightData, price: Number(e.target.value) })} 
                  />
                ) : (
                  `$${flight.price}`
                )}</td>
                <td>
          {editingFlightId === flight._id ? (
            <button onClick={() => editHandle(flight._id, updatedFlightData)}>Save</button>
          ) : (
            <button onClick={() => startEditing(flight)}>Edit</button>
          )}&nbsp;
          <button onClick={() => deleteHandle(flight._id)}>Delete</button>
        </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserProfile;
