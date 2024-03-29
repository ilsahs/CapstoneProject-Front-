import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './Navbar'; 
import EventBot from './pages/EventBot';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Comment from './Comments';
import Dashboard from './dashboard';
import Logout from './Logout';
import Complete from './complete';
import Forum from './forum'
import Fcomments from './fcomments';
import Replies from './replies';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/eventbot' element={<EventBot />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/complete' element={<Complete />} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/comment' element={<Comment/>}/>
        <Route path='/logout' element={<Logout />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/fcomments' element={<Fcomments/>} />
        <Route path='/:id/replies' element={<Replies/>} />
      </Routes>
    </Router>
  );
}

export default App;
