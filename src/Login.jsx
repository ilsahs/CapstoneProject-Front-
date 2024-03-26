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
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
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
        axios.post( baseURL + '/login', {Email, Password})
        .then(res => {
            console.log("login: " + res.data);
            console.log("status" + res.data.Status)
            console.log("skip" + res.data.Skip)
            if(res.data.Status === "Success" && res.data.Skip === "true") {
                navigate("/dashboard",{ state: { token: res.data.token }})
            }
            if(res.data.Status === "Success" && res.data.Skip === "false") {
              navigate("/complete")
          }
        }).catch(err => console.log(err))
    }

    return (
      <div className="log-container">
        <div className="log-boxes">
          <div className="log-left">
            <h2 className="title">LOGIN</h2>
            {message && <div className="alert alert-info" role="alert">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Email"><strong>Email</strong></label><br/>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="input rounded"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div><br/>
              <div className="mb-3">
                <label htmlFor="Password"><strong>Password</strong></label><br/>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="input rounded"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="anchor">
                <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
              </p>
              </div>
              <button type="submit" className="button w-100 rounded">Login</button>
              
            </form><br/>
            <p className="anchor">New to our platform? <Link to="/Register" className="btn btn-default border bg-light rounded text-decoration-none">Sign Up</Link></p>
          </div>
          <div className="log-right">
            <h2>Don't have an account?!</h2>
            <p> Discover, Connect, Chat! Your ultimate hub for Event Exploration and Connection</p><br/>
            <Link to="/Register" className="button w-100 rounded">
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;
