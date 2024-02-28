import { useState } from "react";
import './css/register.css';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

function Signup() {
    const [Name, setName] = useState()
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/Register', {Name, Email, Password}).catch(err => console.log(err))
        .then(res => {
            navigate('/login')}
        )
    }

    return (
      <div className="container">
          <div className="left-side">
              <h2 className="title">SIGN UP</h2>
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="Name">
                          <strong>Name</strong>
                      </label>
                      <input
                          type="text"
                          placeholder="Enter Name"
                          autoComplete="off"
                          name="Name"
                          className="input rounded"
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="Email">
                          <strong>Email</strong>
                      </label>
                      <input
                          type="email"
                          placeholder="Enter Email"
                          autoComplete="off"
                          name="Email"
                          className="input rounded"
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
                          className="input rounded"
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <button type="submit" className="button w-100 rounded">Register</button>
              </form>
              
          </div>
          <div className="right-side">
              <h2>Welcome Back!</h2>
              <p>Login to continue exploring and connecting with our platform</p>
              <Link to="/login" className="button w-100 rounded">
                  LOGIN
              </Link>
          </div>
      </div>
  );
}

export default Signup;

