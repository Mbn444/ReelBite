import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/AuthForms.css';
import { useAuth } from '../context/AuthContext'; // <-- 1. Import the useAuth hook

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { authUser, login } = useAuth(); // <-- 2. Get the authUser and login function

    useEffect(() => {
        // This redirect logic is still important
        if (authUser) {
            navigate('/feed');
        }
    }, [authUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Logging in...');

        if (!email || !password) {
            return toast.error('All fields are required.', { id: toastId });
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/login", {
                email,
                password
            }, {
                withCredentials: true
            });

            toast.success('Logged in successfully!', { id: toastId });

            // --- 3. THIS IS THE FIX ---
            if (response.data && response.data.user) {
                // First, update the global state with the user data from the API
                login(response.data.user);
                // Then, navigate to the home page
                navigate('/');
            } else {
                toast.error('Login successful, but user data not found.', { id: toastId });
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage, { id: toastId });
            console.error("User login failed:", error);
        }
    };

    if (authUser) {
        return null;
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h1>Welcome Back!</h1>
                <div className="form-body">
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className="form-label">Email Address</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <button type="submit" className="submit-btn">Log In</button>
                </div>
                <div className="bottom-link">
                    <span>Need an account? </span>
                    <Link to="/user/register">Register</Link>
                </div>
                <div className="extra-link">
                    <span>Are you a business? </span>
                    <Link to="/food-partner/login">Partner Login</Link>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;