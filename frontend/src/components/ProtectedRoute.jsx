import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { authUser } = useAuth();

    // Check if the user is logged in AND is a food partner
    // Adjust 'isFoodPartner' to match your actual user object property
    if (!authUser || !authUser.isFoodPartner) {
        // Redirect them to the login page if not authenticated
        return <Navigate to="/food-partner/login" />;
    }

    // If they are authenticated, render the child route content
    return <Outlet />;
};

export default ProtectedRoute;