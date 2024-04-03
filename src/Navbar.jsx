import React, { useState, useEffect } from 'react';
import { Button } from './Button'; // Ensure this Button component is properly exported and compatible with JSX.
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';
import LogoImage from './assets/log23.jpg';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
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

  const logoutButton = (location.pathname === '/dashboard' || location.pathname === '/forum') ? (
    <li className='nav-item'>
        <Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
            Logout
        </Link>
    </li>
) : null;

  useEffect(() => {
    showButton();
    const handleResize = () => showButton();

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <li className='chat'>
              <Link to='./forum' className='nav-links' onClick={closeMobileMenu}>
                Forum
              </Link>
            </li>
            <li className='chat'>
              <Link to='/favorites' className='nav-links' onClick={closeMobileMenu}>
                Favorites
              </Link>
            </li>
            {logoutButton} {/* Include the logoutButton here */}
            <li>
              <Link to='./Register' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
