import React from 'react';
import './css/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <p className='footer-description'>Dive into the vibrant world of events with us – Your Key to Endless Entertainment!</p>
      <div className='footer-section'>
        <h2>Quick Links</h2>
        <ul>
          <li><Link to='/dashboard'>Events</Link></li>
          <li><Link to='/forum'>Threads</Link></li>
        </ul>
      </div>
      <div className='footer-section'>
        <h2>Follow Us</h2>
        <div className='social-icons'>
          <a href='#'><i className='fab fa-facebook-f'></i></a>
          <a href='#'><i className='fab fa-twitter'></i></a>
          <a href='#'><i className='fab fa-instagram'></i></a>
          <a href='#'><i className='fab fa-linkedin'></i></a>
        </div>
      </div>
      <div className='footer-section'>
        <h2>Inquiries</h2>
        <p> wanderqatar@gmail.com</p>
      </div>
    </div>
  );
}

export default Footer;
