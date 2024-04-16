import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Comments from "./Comments";
import './css/dashboard.css';
import eventBanner from './assets/event33.jpg'; // Import the banner image
import Chatbot from './Chatbot'; // Import the Chatbot component
import Footer from './Footer';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; 
import { FaClock } from 'react-icons/fa';
// npm install react-icons


function Dashboard() {
    const [suc, setSuc] = useState();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [email, setEmail] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(baseURL+'/dashboard');
                setSuc("Successded OK");
                setEvents(res.data.events);
                setFilteredEvents(res.data.events); // Set filtered events initially
                setEmail(res.data.email);
            } catch (error) {
                if (error.response) {
                    console.error("Server responded with non-success status", error.response.status);

                    if (error.response.status === 401 || error.response.status === 404) {
                        // Unauthorized or Not Found, redirect to login
                        navigate('/login', { state: { message: 'Please login to proceed.' } });
                    }
                }
            }
        };

        fetchData();
    }, [navigate]);

    const formatDate = (dateString) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateString);

        let day = date.getDate() - 1;
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let monthName;

        if (month == 2 && day == 0){
            day = 28;
        } else if (month % 2 == 1 && day == 0){
            day = 30;
            month = month - 1;
        } else if (month % 2 == 0 && day == 0){
            if (month == 1){
                month = 12;
            } else { 
                month = month - 1;
            }
            day = 31;
        }

        monthName = monthNames[parseInt(month) - 1];
        return `${day} ${monthName} ${year}`;
    };

    // Function to handle search logic
    const handleSearch = () => {
        const filtered = events.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredEvents(filtered);
    };

    const handleEventClick = (event) => {
        // Navigate to the event details page with the event data
        navigate(`/event/${event._id}`, { state: { event } }); // Pass the event object in the state
    };
    
    return (
        <div>
            <div className="banner">
                <img src={eventBanner} alt="Banner" />
                <div className="banner-text">
                    <h2>EVENTS IN QATAR</h2>
                    <p>Discover an unforgettable holiday experience in Qatar with a variety of thrilling events like never before.</p>
                </div>
            </div>
            <div className="dashboard-container">
                {/* Search box */}
                <div className="search-container">
                <input 
                    type="text"
                    placeholder="Search by title, category, or location"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/* Submit button */}
                <button className="search-button"onClick={handleSearch}>Search</button>
                </div>
                <ul className="events-list">
                    {filteredEvents.map(event => (
                        <li key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
                            <img src={event.image} alt="Event" />
                            <div className="event-details">
                                <p><h3>{event.title}</h3></p>
                                <hr />
                                <p className="location-text"><FaMapMarkerAlt /> {event.location}</p>
                                <p className="time-text"><FaClock /> {event.time}</p>
                                <p className="date-text"><FaCalendarAlt /> {formatDate(event.startDate)} {event.endDate ? " - " + formatDate(event.endDate) : null}</p>
                                {/*<p>Category: {event.category}</p>*/}
                                {/*<p> {event.description}</p>*/}
                               {/* <div className="comments-section">*/}
                                    {/*<p>Comments:</p>*/}
                                    {/* Assuming Comments is a component */}
                                    {/*<Comments eventId={event._id} email={email} />*/}
                                {/*</div>*/}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Pop-up window for showing event details */}

        <Chatbot /> {/* Include the Chatbot component */}
        <Footer /> {/* Include the Footer component */}
    </div>
);
}

export default Dashboard;