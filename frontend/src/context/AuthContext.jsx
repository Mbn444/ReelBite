import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // This API endpoint checks if a valid cookie exists
                const response = await axios.get('http://localhost:3000/api/auth/status', { withCredentials: true });
                setAuthUser(response.data.user);
            } catch (error) {
                setAuthUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    const login = (user) => {
        setAuthUser(user);
    };

    const logout = async () => {
        // You would also call a backend logout endpoint here
        setAuthUser(null);
    };

    const value = {
        authUser,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};