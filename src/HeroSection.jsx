import React from 'react';
import './App.css';
import { Button } from './Button'; // Ensure this Button component is properly exported and compatible with JSX.
import './css/HeroSection.css';
import adventureVideo from './assets/1103277253-preview.mp4'; // Import the video file

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={adventureVideo} autoPlay loop muted playsInline />
      <h1>FIND YOUR NEXT ADVENTURE</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          SIGN UP NOW!
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
