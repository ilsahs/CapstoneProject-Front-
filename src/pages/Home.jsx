import React from 'react';
import '../App.css'; 
import HeroSection from '../HeroSection'; 
import Footer from '../Footer'; 
import Chatbot from '../Chatbot';
import Trending from '../Trending';

function Home() {
  return (
    <>
      <HeroSection />
      <Trending/>
      <Chatbot/>
      <Footer />
    </>
  );
}

export default Home;
