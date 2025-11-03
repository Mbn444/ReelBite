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
                // We will create this backend endpoint next
                const response = await axios.get('http://localhost:3000/api/auth/status', { withCredentials: true });
                if (response.data && response.data.user) {
                    setAuthUser(response.data.user);
                }
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
        // Here you would also call your backend logout endpoint
        setAuthUser(null);
    };

    const value = {
        authUser,
        isLoading,
        login,
        logout,
    };

    // We only render the app once we've checked the auth status
    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};