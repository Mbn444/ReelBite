import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Run: npm install react-icons
import '../styles/Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
    // In a real app, you would get this from your AuthContext
    const isFoodPartner = true;

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
                    InstaFood
                </Link>

                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-links" onClick={closeMobileMenu} end>
                            Feed
                        </NavLink>
                    </li>
                    {isFoodPartner && (
                        <li className="nav-item">
                            <NavLink to="/partner/dashboard" className="nav-links" onClick={closeMobileMenu}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;