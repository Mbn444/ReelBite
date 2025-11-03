import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // We'll use this to greet the user
// We will create the CSS for this later
// import '../../styles/Dashboard.css'; 

const Dashboard = () => {
    // Get the logged-in user's data from the global context
    const { authUser } = useAuth();

    return (
        <div className="dashboard-container">
            <h1>Welcome, {authUser?.businessName || 'Partner'}!</h1>
            <p>This is your dashboard. From here, you can manage your meals and profile.</p>
            
            <div className="dashboard-actions">
                <Link to="/partner/create-food" className="dashboard-button">
                    Upload a New Meal
                </Link>
                 <Link to={`/food-partner/${authUser?._id}`} className="dashboard-button">
                    View Your Public Profile
                </Link>
                {/* We can add a link to an "Edit Profile" page later */}
            </div>
        </div>
    );
};

export default Dashboard;