import React, { useState, useEffect } from 'react';
import { Button } from './Button'; // Ensure this Button component is properly exported and compatible with JSX.
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';
import LogoImage from './assets/log23.jpg';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const location = useLocation(); // Use useLocation hook to get the current location

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };



  useEffect(() => {
    showButton();
    const handleResize = () => showButton();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    
    setIsLoggedIn(isAuthenticated);
  }, [location.pathname]);

  const logoutButton = isLoggedIn ? (
    <li className='nav-item'>
      <Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
        Logout
      </Link>
    </li>
  ) : null;

  const isAuthenticated = () => {
    // Check if the token exists in the cookies
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    return !!token;
  };
  

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={LogoImage} alt='Logo' className='logo-image' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='./dashboard' className='nav-links' onClick={closeMobileMenu}>
                Events
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='./forum' className='nav-links' onClick={closeMobileMenu}>
                Forum
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            {logoutButton} {/* Include the logoutButton here */}
            {!isLoggedIn && ( // Render Sign Up link only if the user is not logged in
              <li>
                <Link to='./login' className='nav-links-mobile' onClick={closeMobileMenu}>
                  Login
                </Link>
              </li>
            )}
          </ul>
          {/* Render Sign Up button if the user is not logged in */}
          {!isLoggedIn && button && <Button buttonStyle='btn--outline'>Login</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
