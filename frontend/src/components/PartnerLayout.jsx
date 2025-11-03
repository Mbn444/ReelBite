import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import '../styles/PartnerLayout.css';

const PartnerLayout = () => {
    const { authUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            logout();
            toast.success('Logged out successfully.');
            navigate('/');
        } catch (error) {
            toast.error('Logout failed.');
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
                    {/* --- THIS IS THE FIX --- */}
                    {/* The NavLink paths must exactly match the paths in AppRoutes.jsx */}
                    <NavLink to="/partner/dashboard" className="sidebar-link" end>
                        Dashboard
                    </NavLink>
                    <NavLink to="/partner/create-food" className="sidebar-link">
                        Upload Meal
                    </NavLink>
                    <NavLink to={`/food-partner/${authUser?._id}`} className="sidebar-link">
                        View Public Profile
                    </NavLink>
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