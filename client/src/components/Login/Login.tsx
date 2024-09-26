import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import "./Login.css"
import { loginUser } from './authSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

interface userDataType {
	username:string,
	password:string
  };
 /* interface LoginProps {
    sharedData: boolean;
    setSharedData: (data: boolean) => void;
  }*/
  interface LoginProps {
    onLogin: () => void;
  }
const Login:React.FC<LoginProps> = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector((state:RootState) => state.auth);
	const handleSubmit=(e:any)=>{
		e.preventDefault()
		const userData:userDataType = {
			username,
			password,
		  };
      console.log("lll")
		  dispatch(loginUser(userData))
		  .then((res) => {
			if (res.payload.token) {
			  localStorage.setItem("userToken", res.payload.token);  // Store token in localStorage
        console.log("payload user",res.payload.user)
        let {username}=res.payload.user||'';
        localStorage.setItem("user", JSON.stringify(username))
        onLogin();
			  navigate("/");  // Redirect to dashboard on successful login
			}
		  })
		  .catch((err) => console.error(err));
	  };
		
useEffect(()=>{
  console.log("gggg")
})
		
	
  return (
    <div className="login-wrap">
  <div className="login-html">
    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked />
    <label htmlFor="tab-1" className="tab">Sign In</label>
    <input id="tab-2" type="radio" name="tab" className="sign-up" />
    <label htmlFor="tab-2" className="tab">Sign Up</label>
    <div className="login-form">
      <div className="sign-in-htm">
        <div className="group">
          <label htmlFor="user" className="label">Username</label>
          <input id="user" type="text" className="input" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">Password</label>
          <input id="pass" type="password" className="input" data-type="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="group">
          <input id="check" type="checkbox" className="check" defaultChecked />
          <label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
        </div>
        <div className="group">
          <input type="submit" className="button" value="Sign In" onClick={(e)=>handleSubmit(e)}/>
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <a href="#htmlForgot">Forgot Password?</a>
        </div>
      </div>
      <div className="sign-up-htm">
        <div className="group">
          <label htmlFor="newuser" className="label">Username</label>
          <input id="newuser" type="text" className="input" />
        </div>
        <div className="group">
          <label htmlFor="newpass" className="label">Password</label>
          <input id="newpass" type="password" className="input" data-type="password" />
        </div>
        <div className="group">
          <label htmlFor="repeatpass" className="label">Repeat Password</label>
          <input id="repeatpass" type="password" className="input" data-type="password" />
        </div>
        <div className="group">
          <label htmlFor="email" className="label">Email Address</label>
          <input id="email" type="text" className="input" />
        </div>
        <div className="group">
          <input type="submit" className="button" value="Sign Up" />
        </div>
        <div className="hr"></div>
        <div className="foot-lnk">
          <label htmlFor="tab-1">Already Member?</label>
        </div>
      </div>
    </div>
  </div>
</div>


  )
}

export default Login