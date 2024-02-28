import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios'

import PreferencesSelector from './pref'
function Complete() {
    const [ProfilePicture, setProfilePicture] = useState()
    const [DOB, setDOB] = useState()
    const [Password, setPassword] = useState()
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const navigate = useNavigate()
    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
    formData.append('ProfilePicture', ProfilePicture);
    formData.append('DOB', DOB);
    formData.append('selectedPreferences', selectedPreferences.join(','));

    

    axios.post('http://localhost:3001/complete', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    })
    .then(res => {
        
        navigate('/login');
    })
    .catch(err => console.log(err));

    }
    const handleFileChange = (e) => {
        // Set the selected file in state
        setProfilePicture(e.target.files[0]);
      };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-55">
        <h2>Complete your profile!</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="ProfilePicture">
              <strong> Choose a Profile Picture</strong>
            </label>
            <input
              type="file"
              placeholder="Choose Image"
              autoComplete="off"
              name="ProfilePicture"
              className="form-control rounded-0"
              onChange={handleFileChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="DOB">
              <strong>DOB</strong>
            </label>
            <input
              type="date"
              placeholder="Enter DOB"
              autoComplete="off"
              name="DOB"
              className="form-control rounded-0"
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <PreferencesSelector 
          selectedPreferences={selectedPreferences}
          setSelectedPreferences={setSelectedPreferences}/> 
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Update
          </button>
          </form>
          <p></p>
          <Link to="/dashboard" style={{color:'black'}}>
          Skip for now
          </Link>
        
      </div>
    </div>
  );
}

export default Complete;
