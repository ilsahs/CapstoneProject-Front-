import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './css/complete.css'
import axios from 'axios'

import PreferencesSelector from './pref'
function Complete() {
    const [ProfilePicture, setProfilePicture] = useState()
    const [skip, setSkip] = useState(false)
    const [DOB, setDOB] = useState()
    const [Password, setPassword] = useState()
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const navigate = useNavigate()
    const location = useLocation();
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
    formData.append('ProfilePicture', ProfilePicture);
    formData.append('DOB', DOB);
    formData.append('Skip', skip);
    formData.append('selectedPreferences', selectedPreferences.join(','));

    

    axios.post(baseURL+'/complete', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    })
    .then(res => {
        
        navigate('/dashboard');
    })
    .catch(err => console.log(err));

    }
    const handleFileChange = (e) => {
        // Set the selected file in state
        setProfilePicture(e.target.files[0]);
      };

      const handleCheckboxChange = (e) => {
        setSkip(e.target.checked); 
    };
      return (
        <div className="complete-container">
          <div className="form-container">
            <h2 className="complete-h2">Complete your profile!</h2>
            <form onSubmit={handleSubmit}>
              <div className="file-input-container mb-3">
                <label htmlFor="ProfilePicture" className="file-input-label">
                  <strong> Choose a Profile Picture</strong>
                </label>
                <input
                  type="file"
                  placeholder="Choose Image"
                  autoComplete="off"
                  name="ProfilePicture"
                  className="file-input form-control rounded-0"
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
                  className="date-input form-control rounded-0"
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div><br/>
              <div className="preferences-selector-container mb-3">
                <PreferencesSelector 
                  selectedPreferences={selectedPreferences}
                  setSelectedPreferences={setSelectedPreferences}
                /> 
              </div>
              <button type="submit" className="update-button btn btn-success w-100 rounded-0">
                Update
              </button>
            </form><br/>
            <p></p>
                
                    <input type="checkbox" checked={skip} onChange={handleCheckboxChange}/>
                    <label>
                    Don't show this again
                </label>
<br></br>
            <Link to="/dashboard" className="skip-link" style={{color:'black'}}>
              Skip for now
            </Link>
          </div>
        </div>
      );
}

export default Complete;
