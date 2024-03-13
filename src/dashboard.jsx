import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Comments from "./Comments";
import './css/dashboard.css';
import eventBanner from './assets/event33.jpg'; // Import the banner image


function Dashboard() {
    const [suc, setSuc] = useState()
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [email,setEmail] = useState()
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/dashboard');
                setSuc("Successded OK");
                console.log("Response:", res.data);
                console.log("Events:", res.data.events); 
                setEvents(res.data.events);
                setEmail(res.data.email)
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
                <ul className="events-list">
                    {events.map(event => (
                        <li key={event.id} className="event-item">
                            <img src={event.image} alt="Event" />
                            <div className="event-details">
                                <p><b>Title: {event.title}</b></p>
                                <p>Date: {event.date}</p>
                                <p>Time: {event.time}</p>
                                <p>Location: {event.location}</p>
                                <p>Category: {event.category}</p>
                                <p>Summary: {event.description}</p>
                                <div className="comments-section">
                                    <p>Comments:</p>
                                    {/* Assuming Comments is a component */}
                                    <Comments eventId={event._id} email={email}/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;