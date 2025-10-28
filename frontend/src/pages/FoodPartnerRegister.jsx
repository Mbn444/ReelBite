import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const FoodPartnerRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating partner account...');

        const businessName = e.target.businessName.value;
        const contactName = e.target.contactName.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const address = e.target.address.value;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
                businessName,
                contactName,
                phone,
                email,
                password,
                address
            }, {
                withCredentials: true
            });

            toast.success('Partner account created successfully!', { id: toastId });
            console.log(response.data);
            navigate("/");

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || 'Registration failed. Please try again.', { id: toastId });
            } else if (error.request) {
                toast.error('Network error. Please check your connection.', { id: toastId });
            } else {
                toast.error('An unexpected error occurred.', { id: toastId });
            }
            console.error("Food Partner registration failed:", error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <h1>Food Partner Register</h1>
                <div className="form-body">
                    <div className="form-group">
                        <input type="text" id="businessName" name="businessName" className="form-input" placeholder=" " required />
                        <label htmlFor="businessName" className="form-label">Business Name</label>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" id="contactName" name="contactName" className="form-input" placeholder=" " required />
                            <label htmlFor="contactName" className="form-label">Contact Name</label>
                        </div>
                        <div className="form-group">
                            <input type="tel" id="phone" name="phone" className="form-input" placeholder=" " required />
                            <label htmlFor="phone" className="form-label">Phone</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" name="email" className="form-input" placeholder=" " required />
                        <label htmlFor="email" className="form-label">Business Email</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" name="password" className="form-input" placeholder=" " required />
                        <label htmlFor="password" className="form-label">Password</label>
                    </div>
                    <div className="form-group">
                        <input type="text" id="address" name="address" className="form-input" placeholder=" " required />
                        <label htmlFor="address" className="form-label">Address</label>
                    </div>
                    <button type="submit" className="submit-btn">Create Partner Account</button>
                </div>
                <div className="bottom-link">
                    <span>Already have an account? </span>
                    <Link to="/food-partner/login">Login</Link>
                </div>
                <div className="bottom-link">
                    <Link to="/user/register">Register as a User</Link>
                </div>
            </form>
        </div>
    );
};

export default FoodPartnerRegister;
