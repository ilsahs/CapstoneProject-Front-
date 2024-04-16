import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import PreferencesSelector from './pref'
import './css/myProfile.css'
function Profile() {
    const [ProfilePicture, setProfilePicture] = useState()
    const [ProfilePictureToSend, setProfilePictureToSend] = useState()
    const [DOB, setDOB] = useState()
    const [Password, setPassword] = useState()
    const [Email, setEmail] = useState()
    const [Name, setName] = useState()
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    const navigate = useNavigate()
    const location = useLocation();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {

                const res = await axios.get(baseURL + '/profile');

                console.log("Response:", res.data);
                setProfilePicture(res.data.ProfilePicture);
                setDOB(res.data.DOB)
                setName(res.data.username)
                setSelectedPreferences(res.data.preferences.split(','));
                console.log(selectedPreferences)
                setEmail(res.data.Email)
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with non-success status", error.response.status);

                    if (error.response.status === 401) {
                        // Unauthorized, redirect to login
                        navigate('/login', { state: { message: 'Please login to proceed.' } });
                    }
                }
            }
        };

        fetchData();
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
    formData.append('ProfilePicture', ProfilePictureToSend);
    formData.append('Name', Name);
    formData.append('DOB', DOB);
    formData.append('selectedPreferences', selectedPreferences.join(','));
    axios.post(baseURL+'/profile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
    })
    .then(res => {
        alert("Profile updated!")
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

    return (
        <div className="complete-container">
            <div className="form-container">
                <h2 className="complete-h2">My profile</h2>

                <form onSubmit={handleSubmit}>
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
                    <div className="mb-3">
                        <label htmlFor="Email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="DOB"
                            className="date-input form-control rounded-0"
                            value={Email}
                            disabled
                        />
                    </div><br />
                    <div className="mb-3">
                        <label htmlFor="Name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            name="DOB"
                            className="date-input form-control rounded-0"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div><br />
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
                            value={DOB}
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
            </div>
        </div>
    );
}

export default Profile;



