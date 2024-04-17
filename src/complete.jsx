import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './css/complete.css'
import axios from 'axios'
import placeholderImage from './assets/no.png'
import Chatbot from './Chatbot';

import PreferencesSelector from './pref'
function Complete() {
  const [ProfilePicture, setProfilePicture] = useState(placeholderImage)
  const [skip, setSkip] = useState(false)
  const [DOB, setDOB] = useState()
  const [ProfilePictureToSend, setProfilePictureToSend] = useState()
  const [Password, setPassword] = useState()
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
  const navigate = useNavigate()
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('ProfilePicture', ProfilePictureToSend);
    formData.append('DOB', DOB);
    setSkip(true)
    formData.append('Skip', skip);
    formData.append('selectedPreferences', selectedPreferences.join(','));



    axios.post(baseURL + '/complete', formData, {
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
    const file = e.target.files[0];
    if (file) {
      // Display the selected image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicture(ProfilePicture);
    }
    setProfilePictureToSend(file)
  };

  const handleSkip = (e) => {
    console.log("coming here")
      e.preventDefault()
      axios.post( baseURL + '/skip', {skip})
      .then(
        navigate("/dashboard")
  )}

  const handleCheckboxChange = (e) => {
    setSkip(e.target.checked);
  };
  return (
    <div className="complete-container">
      <div className="forms-container">
        <h2 className="complete-h2">Complete your profile!</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-input-container mb-3">
            <label htmlFor="ProfilePicture" className="file-input-label">
              <strong> Choose a Profile Picture</strong>
            </label>
            <div className="image-container">

              {ProfilePicture && (
                <img
                  src={ProfilePicture}
                  alt="Profile"
                  className="preview-image rounded-circle"
                />
              )}
            </div>
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
          </div><br />
          <div className="preferences-selector-container mb-3">
            <PreferencesSelector
              selectedPreferences={selectedPreferences}
              setSelectedPreferences={setSelectedPreferences}
            />
          </div>
          <button type="submit" className="update-button btn btn-success w-100 rounded-0">
            Update
          </button>
        </form><br />
        <p></p>


        <br></br>
        <form onSubmit={handleSkip}>
        <div className="checkbox-container">
          <input type="checkbox" checked={skip} onChange={handleCheckboxChange} id="skipCheckbox" />
          <label htmlFor="skipCheckbox">Don't show this again</label>
        </div>
          <button type="submit" className="update-button btn btn-success w-100 rounded-0">
            Skip for now
          </button>
        </form>

      </div>
      <Chatbot/>
    </div>
  );
}

export default Complete;