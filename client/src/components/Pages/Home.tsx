import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import FlightSearch from '../FlightSearch/FlightSearch';

const Home:React.FC = () => {
    const [display,setDisplay]=useState<boolean>(false);
    useEffect(()=>{
        localStorage.getItem("userToken")?setDisplay(true):setDisplay(false)
    })
  return (
    <>
    
   { /*<Navbar display={display}/>*/}
    <Header/>
    <FlightSearch/>
    </>
  )
}

export default Home;