import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // <-- Import useAuth
import '../../styles/Landing.css';

const Landing = () => {
    const { authUser } = useAuth(); // <-- Get the authenticated user
    const navigate = useNavigate();

    // --- THIS IS THE NEW LOGIC ---
    useEffect(() => {
        // If a user is logged in, redirect them away from the landing page.
        if (authUser) {
            // If they are a food partner, send them to their dashboard.
            if (authUser.isFoodPartner) {
                navigate('/partner/dashboard');
            } else {
                // Otherwise, send them to the main feed.
                navigate('/feed');
            }
        }
    }, [authUser, navigate]);


    // If the user is logged in, we render nothing to avoid a "flash" of the landing page.
    if (authUser) {
        return null;
    }

    // This part is only visible to logged-out users.
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1>Welcome to Reel Bites</h1>
                <p>Discover and share the best food moments.</p>
                <div className="landing-actions">
                    <Link to="/food-partner/login" className="landing-button">
                        Partner Login
                    </Link>
                    <Link to="/user/login" className="landing-button secondary">
                        User Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;