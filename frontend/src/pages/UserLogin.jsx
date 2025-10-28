import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserLogin = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Logging in...');

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/login", {
                email,
                password
            }, {
                withCredentials: true
            });

            toast.success('Logged in successfully!', { id: toastId });
            console.log(response.data);
            navigate("/");

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Invalid credentials. Please try again.', { id: toastId });
            } else if (error.request) {
                toast.error('Network error. Please check your connection.', { id: toastId });
            } else {
                toast.error('An unexpected error occurred.', { id: toastId });
            }
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h1>User Login</h1>
                <div className="form-body">
                    <div className="form-group">
                        <input type="email" id="email" name="email" className="form-input" placeholder=" " required />
                        <label htmlFor="email" className="form-label">Email Address</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" className="form-input" placeholder=" " required />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </div>
                <div className="bottom-link">
                    <span>Don't have an account? </span>
                    <Link to="/user/register">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default UserLogin;