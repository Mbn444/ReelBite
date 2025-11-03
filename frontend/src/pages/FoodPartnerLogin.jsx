import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AuthForms.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const FoodPartnerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { authUser, login } = useAuth();

    // --- THIS IS THE FIX ---
    // This effect runs whenever the authUser state changes.
    useEffect(() => {
        // If a user is already logged in, redirect them away from this page.
        if (authUser) {
            navigate('/partner/dashboard');
        }
    }, [authUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Logging in...');

        try {
            const response = await axios.post("http://localhost:3000/api/auth/food-partner/login", {
                email,
                password
            }, { withCredentials: true });

            toast.success('Logged in successfully!', { id: toastId });

            if (response.data && response.data.user) {
                login(response.data.user);
                navigate('/partner/dashboard');
            } else {
                navigate('/');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid credentials or server error.';
            toast.error(errorMessage, { id: toastId });
        }
    };

    // If the user is already logged in, we can render nothing to avoid the "flash"
    if (authUser) {
        return null;
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h1>Food Partner Login</h1>
                <div className="form-body">
                    {/* Your form inputs remain the same */}
                    <div className="form-group">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" placeholder=" " required />
                        <label htmlFor="email" className="form-label">Business Email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" placeholder=" " required />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </div>
                <div className="bottom-link">
                    <span>Don't have an account? </span>
                    <Link to="/food-partner/register">Register</Link>
                </div>
                 <div className="extra-link">
                    <span>Not a business? </span>
                    <Link to="/user/login">User Login</Link>
                </div>
            </form>
        </div>
    );
};

export default FoodPartnerLogin;