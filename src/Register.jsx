import { useState } from "react";
import './css/register.css';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
  const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate = useNavigate()

    const [check, setCheck] = useState(false)
    const [error, setError] = useState()
    const handleSubmit = (e) => {
        e.preventDefault()
         // Basic form validation
    if (!Name || !Email || !Password) {
      setError('Please fill in all fields.');
      setCheck(true);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      setError('Please enter a valid email address.');
      setCheck(true);
      return;
    }
    // Validate password strength (add more criteria if needed)
    if (Password.length < 4) {
      setError('Password must be at least 4 characters long.');
      setCheck(true);
      return;
    }
        axios.post(baseURL+'/Register', {Name, Email, Password}).catch(err => console.log(err))
        .then(res => {
          if (res.data === "Success") {
            navigate('/login'); // Navigate if the response is "Success"
          } else {
            setCheck(true)
            setError(res.data); // Set the error message from the response
          }
    })
    }

    return (
      <div className="reg-container">
      <div className="reg-boxes">
        <div className="reg-left">
          <h2>SIGN UP</h2> 
          {check && <p className="error-message">{error}</p>} <br/>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="Name"><strong>Name</strong></label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    autoComplete="off"
                    name="Name"
                    className="input rounded"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div><br/>
                <div className="mb-3">
                  <label htmlFor="Email"><strong>Email</strong></label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    autoComplete="off"
                    name="Email"
                    className="input rounded"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div><br/>
                <div className="mb-3">
                  <label htmlFor="Password"><strong>Password</strong></label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="Password"
                    className="input rounded"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div><br/>
                <button type="submit" className="button w-100 rounded">Register</button>
              </form>
            </div>
            <div className="reg-right">
              <h2>Welcome Back!</h2>
              <p>Login to continue exploring and connecting with our platform</p>
              <Link to="/login" className="button w-100 rounded">LOGIN</Link>
            </div>
          </div>
        </div>
      );
    }
    
    export default Signup;
