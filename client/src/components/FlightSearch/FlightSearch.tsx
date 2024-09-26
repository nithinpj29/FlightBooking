import React, { useState } from 'react';
import "./FlightSearch.css"
import axios from 'axios';
import FlightList from '../FlightList/FlightList';

const FlightSearch: React.FC = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [departureLocation, setDepartureLocation] = useState('')
  const [arrivalLocation, setArrivalLocation] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [passengers, setPassengers] = useState(0)
  const [returnDate, setReturnDate] = useState('')
  const [param, setParam] = useState(false)
  const [selectedClass, setSelectedClass] = useState('');
  const [filter, setFilter] = useState(false)

  const handleState = () => {
    setLoadingSubmit(false)
  }
  const showFilterSection = () => {
    console.log("show filter sction")
    setFilter(!filter)
  }

  const handleClassSelection = (flightClass: string) => {
    setSelectedClass(flightClass);
  };
  return (<div>
    <section className="section__container booking__container">
      {filter === false && <FlightList
        departureLocation={departureLocation}
        arrivalLocation={arrivalLocation}
        departureTime={departureTime}
        passengers={passengers}
        returnDate={returnDate}
        handleState={handleState}
        flightClass={selectedClass}
        showFilterSection={showFilterSection}
      />}
      {filter === true ? <>
        <div className="booking__nav">
          <span

            className={`class-option ${selectedClass === 'Economy' ? 'active' : ''}`}
            onClick={() => handleClassSelection('Economy')}
          >
            Economy
          </span>
          <span
            className={`class-option ${selectedClass === 'Business' ? 'active' : ''}`}
            onClick={() => handleClassSelection('Business')}
          >
            Business
          </span>
          <span
            className={`class-option ${selectedClass === 'First Class' ? 'active' : ''}`}
            onClick={() => handleClassSelection('First Class')}
          >
            First Class
          </span>
        </div>
        <form>
          <div className="form__group">
            <span><i className="ri-map-pin-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input type="text" onChange={(e) => setArrivalLocation(e.target.value)} />
                <label>Location</label>
              </div>
              <p>Where are you goung?</p>
            </div>
          </div>
          <div className="form__group">
            <span><i className="ri-user-3-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input type="number" onChange={(e) => setPassengers(e.target.valueAsNumber)} />
                <label>Travellers</label>
              </div>
              <p>Add guests</p>
            </div>
          </div>
          <div className="form__group">
            <span><i className="ri-calendar-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input type="text" onChange={(e) => setDepartureLocation(e.target.value)} />
                <label>Departure</label>
              </div>
              <p>Add Depature Location</p>
            </div>
          </div>
          <div className="form__group">
            <span><i className="ri-calendar-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input type="text" onChange={(e) => setDepartureTime(e.target.value)} />
                <label>Departure</label>
              </div>
              <p>Add Depature Time ad date</p>
            </div>
          </div>
          <div className="form__group">
            <span><i className="ri-calendar-line"></i></span>
            <div className="input__content">
              <div className="input__group">
                <input type="text" onChange={(e) => setReturnDate(e.target.value)} />
                <label>Return</label>
              </div>
              <p>Add date</p>
            </div>
          </div>
          <button className="btn" onClick={() => { showFilterSection }}><i className="ri-search-line">Submit</i></button>
        </form>
      </> : null}

    </section>
    <br />
  </div>)
};

export default FlightSearch;
