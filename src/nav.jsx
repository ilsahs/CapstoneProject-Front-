import React from "react";
import { useNavigate, Link } from "react-router-dom";
const Nav = () => {
    const signOut = () => {
        alert("User signed out!");
    };
    return (
        <nav className='navbar' style={{backgroundColor:'pink'}}>
            <h3>QatarEvent</h3>
            <div className='navbarRight'>
            <Link to="/logout" className='navbar-link'>Logout</Link>
            {/* <button onClick={signOut}>Sign out</button> */}
            </div>
        </nav>
    );
};

export default Nav;