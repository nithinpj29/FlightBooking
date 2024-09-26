import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, handleLogout }) => {
  const [isLoggedIn2, setIsLoggedIn2] = useState<boolean>(false);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn2(!!token); // If token exists, set isLoggedIn to true
    //setSharedData("true")
  }, [isLoggedIn]);

  const handleLogout2 = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn2(false);
   // setSharedData(false)
    alert("You have successfully logged out");
  };

  return (
    <nav className="container">
      <div className="topnav">
        <Link className="active" to={"/"}>Home</Link>
        <Link to={"/service"}>Service</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/about"}>About</Link>
      </div>
      <div className="topnavright">
        {isLoggedIn ==true? (
          <>
          <Link to="/"><button onClick={handleLogout}>Log Out</button></Link>
          <Link to="/profile"><button>Profile</button></Link>
          
          </>
          
        ) : (
          <>
            <Link to={"/login"}><button>Login</button></Link>
            <Link to={"/signup"}><button>Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
