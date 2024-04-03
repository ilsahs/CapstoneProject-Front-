import React from 'react';
import './css/Footer.css';
import { Button } from './Button'; 
import { Link } from 'react-router-dom';
import LogoFooter from './assets/log23.jpg';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Dive into the vibrant world of events with us – Your Key to Endless Entertainment!
        </p>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Learn More</h2>
            <Link to='/about-us'>About Us</Link>
            <Link to='/sign-up'>Join Us Today</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Gmail</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            <img src={LogoFooter} alt='Logo' className='logo-image' />
            </Link>
          </div>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            {/* Commented out as Gmail icon is not typically provided by Font Awesome in this usage context.
            <Link
              className='social-icon-link gmail'
              to='/'
              target='_blank'
              aria-label='Gmail'
            >
              <i className='fab fa-gmail' />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
