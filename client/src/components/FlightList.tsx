import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FlightList: React.FC = () => {
  const flights = useSelector((state: RootState) => state.flights.flights);

  return (
    <div className="flight-list">
      {flights.map(flight => (
        <div className="flight-item" key={flight.id}>
          <div className="flight-info">
            <h3>{flight.flightNumber} - {flight.airline}</h3>
            <span>{flight.departure} to {flight.arrival}</span>
            <span>{new Date(flight.departureTime).toLocaleString()} - {new Date(flight.arrivalTime).toLocaleString()}</span>
          </div>
          <div className="flight-price">${flight.price}</div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
