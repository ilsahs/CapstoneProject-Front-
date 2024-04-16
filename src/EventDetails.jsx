import React from "react";
import { useLocation } from "react-router-dom";
import "./css/EventDetails.css"; // Import the CSS file for styling
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'; 
import { FaClock } from 'react-icons/fa';


function EventDetails() {
    const location = useLocation();
    const { event } = location.state;

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

    return (
        <div className="event-details-container">
            <h2>{event.title}</h2>
            <img src={event.image} alt="Event" className="event-image" />
            <p className="description">{event.description}</p>
            <hr className="description-line" />
            <p className="category-text">Category: {event.category}</p><br/>
            <p className="date-text"><FaCalendarAlt /> {formatDate(event.startDate)} {event.endDate ? " - " + formatDate(event.endDate) : null}</p>
            <p className="time-text"><FaClock /> {event.time}</p>
            <p className="location-text"><FaMapMarkerAlt />  {event.location}</p>
            {/* Add more details here as needed */}
            
        </div>
    );
}

export default EventDetails;
