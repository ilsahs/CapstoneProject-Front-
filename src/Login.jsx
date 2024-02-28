import React from 'react'
import { useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'
import './css/login.css';


function Login() {
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const location = useLocation();  

    axios.defaults.withCredentials = true;
    useEffect(() => {
      // Checking to see if navigated back to login

      if (location.state && location.state.message) {
        console.log("reached" , location)
          setMessage(location.state.message);
      }
  }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {Email, Password})
        .then(res => {
            console.log("login: " + res.data);
            if(res.data.Status === "Success") {
                navigate("/complete",{ state: { token: res.data.token }})
            }
            if(res.data.Status === "incomp") {
              navigate("/complete")
          }
        }).catch(err => console.log(err))
    }

    return (
      <div className="container">
        <div className="left-side">
          <h2 className="title">LOGIN</h2>
          {message && <div className="alert alert-info" role="alert">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="Email"><strong>Email</strong></label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="input rounded"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label htmlFor="Password"><strong>Password</strong></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                className="input rounded"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button w-100 rounded">Login</button>
          </form>
          <p className="anchor">New to our platform? <Link to="/Register" className="btn btn-default border bg-light rounded text-decoration-none">Sign Up</Link></p>
        </div>
        <div className="right-side">
        <h2>Don't have an account?!</h2>
        <p> Discover, Connect, Chat! Your ultimate hub for Event Exploration and Connection</p>
        <Link to="/Register" className="button w-100 rounded">
          SIGN UP
        </Link>
      </div>

      </div>
    );
  }
  
  export default Login;