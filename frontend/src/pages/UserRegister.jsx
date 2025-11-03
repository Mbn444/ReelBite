import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../styles/AuthForms.css';

const UserRegister = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating account...');

        if (!fullName || !email || !password) {
            return toast.error('All fields are required.', { id: toastId });
        }

        try {
            await axios.post("http://localhost:3000/api/auth/user/register", {
                fullName,
                email,
                password
            }, {
                withCredentials: true
            });

            toast.success('Account created successfully! Please log in.', { id: toastId });
            navigate('/user/login'); // Redirect to the user login page after successful registration

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(errorMessage, { id: toastId });
            console.error("User registration failed:", error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h1>Create Your Account</h1>
                <div className="form-body">
                    <div className="form-group">
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            className="form-input"
                            placeholder=" "
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
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
                            name="password"
                            className="form-input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </div>
                <div className="bottom-link">
                    <span>Already have an account? </span>
                    <Link to="/user/login">Log In</Link>
                </div>
                 <div className="extra-link">
                    <span>Are you a business? </span>
                    <Link to="/food-partner/register">Register Here</Link>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;