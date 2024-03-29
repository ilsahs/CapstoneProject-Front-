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

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(baseURL+'/Register', {Name, Email, Password}).catch(err => console.log(err))
        .then(res => {
            navigate('/login')}
        )
    }

    return (
        <div className="reg-container">
          <div className="reg-boxes">
            <div className="reg-left">
              <h2>SIGN UP</h2> <br/>
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
