import React from 'react';
import './App.css';
import { Button } from './Button'; // Ensure this Button component is properly exported and compatible with JSX.
import './css/HeroSection.css';
import adventureVideo from './assets/vid.mp4'; // Import the video file

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={adventureVideo} autoPlay loop muted playsInline />
      <h1>FIND YOUR NEXT ADVENTURE</h1>
      <p>Join us as we guide you through the vibrant array of 
        Events and Experiences waiting to be explored in Qatar</p>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--medium'
        >
          SIGN UP NOW!
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
