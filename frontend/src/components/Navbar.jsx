import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const showSidebar = () => setSidebar(!sidebar);
    const closeMobileMenu = () => setSidebar(false);

    const handleLogout = async () => {
        try {
            logout();
            toast.success('Logged out successfully.');
            navigate('/'); // On logout, redirect to the public landing page
            closeMobileMenu();
        } catch (error) {
            console.error(error);
            toast.error('Logout failed. Please try again.');
        }
    };

    // Determine where the main logo should link to
    const logoLink = authUser ? (authUser.isFoodPartner ? '/partner/dashboard' : '/feed') : '/';

    return (
        <>
            <header className="top-bar">
                <Link to="#" className="menu-bars">
                    <FaBars onClick={showSidebar} />
                </Link>
                <Link to={logoLink} className="top-bar-logo">
                    InstaFood
                </Link>
            </header>

            <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
                <ul className="sidebar-items" onClick={closeMobileMenu}>
                    <li className="sidebar-toggle">
                        <Link to="#" className="menu-bars">
                            <FaTimes />
                        </Link>
                    </li>

                    {authUser ? (
                        <>
                            <li className="sidebar-text">
                                <NavLink to="/feed" end>Feed</NavLink>
                            </li>
                            {authUser.isFoodPartner && (
                                <li className="sidebar-text">
                                    <NavLink to="/partner/dashboard">Dashboard</NavLink>
                                </li>
                            )}
                            <li className="sidebar-text">
                                <button onClick={handleLogout} className="sidebar-logout-button">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="sidebar-text">
                                <NavLink to="/user/login">User Login</NavLink>
                            </li>
                            <li className="sidebar-text">
                                <NavLink to="/food-partner/login">Partner Login</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            
            {sidebar && <div className="sidebar-overlay" onClick={showSidebar}></div>}
        </>
    );
};

export default Navbar;