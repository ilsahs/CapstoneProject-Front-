import React from "react";
import { useLocation } from "react-router-dom";
import "./css/EventDetails.css"; // Import the CSS file for styling

function EventDetails() {
    const location = useLocation();
    const { event } = location.state;

    return (
        <div className="event-details-container">
            <h2>{event.title}</h2>
            <img src={event.image} alt="Event" className="event-image" />
            <p>Description: {event.description}</p>
            <p>Date: {event.startDate}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <p>Category: {event.category}</p>
            {/* Add more details here as needed */}
        </div>
    );
}

export default EventDetails;
