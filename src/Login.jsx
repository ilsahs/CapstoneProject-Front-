import React from 'react'
import { useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'


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

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        {message && <div className="alert alert-info" role="alert">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="Email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="Password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          </form>
          <p>Already Have an Account</p>
          <Link to="/Register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Sign Up
          </Link>
        
      </div>
    </div>
    )
}

export default Login;