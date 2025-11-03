import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Dashboard.css';

const Dashboard = () => {
    const { authUser } = useAuth();

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <h1>Welcome, {authUser?.businessName}!</h1>
                <p>This is your command center. Manage your content and profile from here.</p>
            </header>

            <div className="dashboard-grid">
                <Link to="/partner/create-food" className="dashboard-card create">
                    <div className="card-icon">➕</div>
                    <h2 className="card-title">Upload a New Meal</h2>
                    <p className="card-description">Share your latest creation with the world.</p>
                </Link>

                <Link to={`/food-partner/${authUser?._id}`} className="dashboard-card profile">
                    <div className="card-icon">👤</div>
                    <h2 className="card-title">View Your Public Profile</h2>
                    <p className="card-description">See how your profile looks to customers.</p>
                </Link>

                {/* You can add more cards here as you build more features */}
                <div className="dashboard-card coming-soon">
                     <div className="card-icon">⚙️</div>
                    <h2 className="card-title">Edit Profile</h2>
                    <p className="card-description">(Coming Soon)</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;