import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './Navbar'; 
import EventBot from './pages/EventBot';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Comment from './pages/Comment';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/eventbot' element={<EventBot />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
