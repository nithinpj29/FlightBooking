import React, { useState } from 'react';
import axios from 'axios';

interface BookingFormProps {
  flightId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ flightId ="123"}) => {
  const [passengerName, setPassengerName] = useState<string>('');
  const [passengerEmail, setPassengerEmail] = useState<string>('');

  const handleBooking = async () => {
    await axios.post('/api/bookings', {
      flightId,
      passengerName,
      passengerEmail,
    });
    alert('Flight booked successfully!');
  };

  return (
    <div className="booking-form">
      <input
        type="text"
        placeholder="Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={passengerEmail}
        onChange={(e) => setPassengerEmail(e.target.value)}
      />
      <button onClick={handleBooking}>Book Flight</button>
    </div>)
    }
    export default BookingForm;
