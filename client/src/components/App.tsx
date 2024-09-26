import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css"
//import Navbar from './components/Navbar';
import FlightSearch from './FlightSearch/FlightSearch';
import FlightList from './FlightList';
import BookingForm from './BookingForm';
import About from './Pages/About';
import Service from './Pages/Service';
import Contact from './Pages/Contact';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import Login from './Login/Login';
//import Login from './components/Login';
//import Register from './components/Register';
//import Footer from './components/Footer';
import {  RootState } from './../redux/store';
import { useSelector } from 'react-redux';
import Home from './Pages/Home';
import Profile from './Profile/Profile';
interface userType{
  user:string|null
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('userToken'));
  const [sharedData, setSharedData] = useState<boolean>(false);
  const [display,setDisplay]=useState<string>('');
  const [loginFomDisplay,setLoginFormDisplay]=useState( localStorage.getItem("userToken") ? true:false)
  const [logout,setLogOut]=useState(false)
  const {  user,token }= useSelector((state:RootState) => state.auth);
  const [userName,setUserName]=useState('')
  

 


useEffect(() => {
  // Check if the token exists when the component mounts
  if (localStorage.getItem('userToken')) {
    setIsLoggedIn(true);
  }
if(localStorage.getItem('user')!==null){
   
    const userData = localStorage.getItem("user");
const parsedUserData = userData ? JSON.parse(userData) : null;

setUserName(parsedUserData)
  }
}, []);
const handleLogin = () => {
  setIsLoggedIn(true);  // Set login state when user logs in
};
const handleLogout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('user')
  setIsLoggedIn(false); // Reset login state when user logs out
};

useEffect(()=>{
   // localStorage.getItem("userToken")?setDisplay("true"):setDisplay("false")
   console.log("SetDisplay",display,sharedData)
},[])
const flights = [
  {
    airline: "Airline A",
    departurePlace: "New York",
    departureDate: "2024-09-15",
    departureTime: "14:30",
    arrivalPlace: "London",
    arrivalDate: "2024-09-16",
    arrivalTime: "06:00",
    price: 750
  },
  {
    airline: "Airline B",
    departurePlace: "Paris",
    departureDate: "2024-09-18",
    departureTime: "09:00",
    arrivalPlace: "Tokyo",
    arrivalDate: "2024-09-19",
    arrivalTime: "03:30",
    price: 1200
  }
];
  return (
<>
    <Router> 
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    <Routes>
    
    <Route path="/" element={<Home/>} />
    <Route path="/profile" element={<Profile  userEmail="john@example.com" flights={flights}/>} />
       <Route path="/about" element={<About/>} />
        <Route path="/service" element={<Service/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path='/login' element={<Login onLogin={handleLogin} />}   />   
                   
        
    
    </Routes>
    
    </Router>
</>
    
    
     
     
    
  );
};

export default App;
