import React from 'react';
import '../App.css'; 
import HeroSection from '../HeroSection'; 
import Footer from '../Footer'; 
import Chatbot from '../Chatbot';

function Home() {
  return (
    <>
      <HeroSection />
      <Chatbot/>
      <Footer />
    </>
  );
}

export default Home;
