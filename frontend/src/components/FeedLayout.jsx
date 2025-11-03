import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaHome, FaPlusSquare, FaUser, FaCompass, FaSignOutAlt } from 'react-icons/fa';
import '../styles/FeedLayout.css';

const FeedLayout = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logout();
            toast.success('Logged out successfully.');
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error); 
            toast.error('Logout failed.');
        }
    };

    return (
        <div className="feed-layout">
            <aside className="feed-sidebar">
                <h1 className="sidebar-logo-feed">ReelBites</h1>
                <nav className="sidebar-nav-feed">
                    <NavLink to="/feed" className="sidebar-link-feed" end>
                        <FaHome /><span>Home</span>
                    </NavLink>
                    <NavLink to="/explore" className="sidebar-link-feed">
                        <FaCompass /><span>Explore</span>
                    </NavLink>
                    {authUser?.isFoodPartner && (
                         <NavLink to="/partner/create-food" className="sidebar-link-feed">
                            <FaPlusSquare /><span>Create</span>
                        </NavLink>
                    )}
                    {authUser && (
                        // --- THIS IS THE FIX ---
                        // The "My Profile" link should always go to the static "/profile" route.
                        <NavLink to="/profile" className="sidebar-link-feed">
                            <FaUser /><span>Profile</span>
                        </NavLink>
                    )}
                </nav>
                {authUser && (
                    <div className="sidebar-footer-feed">
                        <button onClick={handleLogout} className="sidebar-link-feed logout">
                            <FaSignOutAlt /><span>Logout</span>
                        </button>
                    </div>
                )}
            </aside>

            <main className="feed-content-area">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                <NavLink to="/feed" className="bottom-nav-link" end>
                    <FaHome />
                </NavLink>
                <NavLink to="/explore" className="bottom-nav-link">
                    <FaCompass />
                </NavLink>
                 {authUser?.isFoodPartner && (
                    <NavLink to="/partner/create-food" className="bottom-nav-link">
                        <FaPlusSquare />
                    </NavLink>
                )}
                {authUser && (
                    // --- THIS IS THE FIX ---
                    // The "My Profile" link should also go to the static "/profile" route.
                    <NavLink to="/profile" className="bottom-nav-link">
                        <FaUser />
                    </NavLink>
                )}
            </nav>
        </div>
    );
};

export default FeedLayout;