import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { authUser } = useAuth();

    // This guard simply checks if ANY user is logged in.
    if (!authUser) {
        // If not logged in, send them to the public landing page.
        return <Navigate to="/" replace />;
    }

    // If they are logged in (any role), allow access.
    return <Outlet />;
};

export default ProtectedRoute;