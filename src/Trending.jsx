import React from 'react';
import EntImage from './assets/ent.jpg';
import FoodImage from './assets/food.jpg';
import SportsImage from './assets/sports.jpg';
import ArtsImage from './assets/arts.jpg';
import './css/Trending.css';
import CREATEVideo from './assets/CREATE.mp4';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Trending() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        axios.defaults.withCredentials = true;
        const baseURL = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_API_BASE_URL_PROD : import.meta.env.VITE_API_BASE_URL_DEV;

        const currentDate = new Date();
        const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
              
        const startDateString = firstDayOfWeek.toISOString();
        const endDateString = lastDayOfWeek.toISOString();
        console.log(startDateString)
        console.log(endDateString)
        const response = await axios.get(baseURL+`/events/this-week/` + `${startDateString} - ${endDateString}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
      fetchEvents();
    }, []);


    const formatDate = (dateString) => {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const date = new Date(dateString);
      console.log(date)
      const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
      const [day, month, year] = formattedDate.split("/");

      const monthName = monthNames[parseInt(month) - 1];
      console.log(monthName)
      const form = `${day} ${monthName} ${year}`;
      return form;
    }  

  return (
    <div className="trending-container">
     
      <div className="video-container">
        <video className="create" autoPlay loop muted>
          <source src={CREATEVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="about-us">
      <h2>About Us</h2>
      <p>Welcome to Qatar Events, your ultimate destination for discovering upcoming and trending events happening in Qatar! Whether you're a local resident or a visitor to this vibrant country, we're here to help you stay informed about the latest happenings, from cultural festivals to sports events, concerts, exhibitions, and much more.</p>
      <p>At Qatar Events, we're passionate about connecting people with enriching experiences and creating memorable moments. Our dedicated team works tirelessly to curate a diverse range of events, ensuring there's something for everyone to enjoy.</p>
      <p>Join us in celebrating the vibrant cultural scene and dynamic community spirit of Qatar. Let Qatar Events be your guide to the best that this beautiful country has to offer!</p>

      </div>

      <div className="categories-container">
        <div className="category">
          <img src={EntImage} alt="Entertainment" />
          <h2>Entertainment</h2>
          <h3>Entertainment</h3>
        </div>
        
        <div className="category">
          <img src={FoodImage} alt="Food and Dining" />
          <h2>Food and Dining</h2>
          <h3>Food and Dining</h3>
        </div>
        
        <div className="category">
          <img src={SportsImage} alt="Sports" />
          <h2>Sports</h2>
          <h3>Sports</h3>
        </div>
        
        <div className="category">
          <img src={ArtsImage} alt="Arts and Culture" />
          <h2>Arts and Culture</h2>
          <h3>Arts and Culture</h3>
        </div>
      </div>

      <div className="events-container">
        <h2>Events This Week</h2>
          {Array.isArray(events) && events.map(event => (
            <div className="event" key={event._id}>
              <div className="category">
              <img src={event.image} height alt={event.name} />
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>Date: {formatDate(event.startDate)}</p>
                <p>Time: {event.time}</p>
                <p>Location: {event.location}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function MainPage() {
  return (
    <div className="main-container">
      <div className="page-padding">
        <Trending />
      </div>
    </div>
  );
}

export default MainPage;
