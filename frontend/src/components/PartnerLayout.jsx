import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/PartnerLayout.css'; // We will create this file next

const PartnerLayout = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logout();
            toast.success('Logged out successfully.');
            navigate('/');
        } catch (err) {
            toast.error(`Logout failed: ${err?.message || err}`);
        }
    };

    return (
        <div className="partner-layout">
            <aside className="partner-sidebar">
                <div className="sidebar-header">
                    <h1 className="sidebar-logo">ReelBites</h1>
                    <span className="sidebar-greeting">Welcome, {authUser?.businessName}</span>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/partner/dashboard" className="sidebar-link" end>
                        Dashboard
                    </NavLink>
                    <NavLink to="/partner/create-food" className="sidebar-link">
                        Upload Meal
                    </NavLink>
                    <NavLink to={`/food-partner/${authUser?._id}`} className="sidebar-link">
                        View Public Profile
                    </NavLink>
                    {/* Add more links like "Edit Profile", "Analytics" etc. here */}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="sidebar-logout-button">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="partner-content">
                <Outlet />
            </main>
        </div>
    );
};

export default PartnerLayout;