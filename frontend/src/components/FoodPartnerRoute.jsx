import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- THIS IS THE FIX ---
const FoodPartnerRoute = () => { // <-- Renamed the function
    const { authUser } = useAuth();

    // This guard specifically checks for the food partner role.
    if (!authUser || !authUser.isFoodPartner) {
        return <Navigate to="/food-partner/login" replace />;
    }

    return <Outlet />;
};

// --- AND FIX THIS TOO ---
export default FoodPartnerRoute; // <-- Renamed the export