import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserRegister = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const toastId = toast.loading('Creating your account...');

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/user/register", {
                fullName: `${firstName} ${lastName}`,
                email,
                password
            }, {
                withCredentials: true
            });

            toast.success('Account created successfully!', { id: toastId });
            console.log(response.data);
            navigate("/");

        } catch (error) {
            if (error.response) {
                // Server responded with a status code that falls out of the range of 2xx
                toast.error(error.response.data.message || 'Registration failed. Please try again.', { id: toastId });
            } else if (error.request) {
                // The request was made but no response was received
                toast.error('Network error. Please check your connection.', { id: toastId });
            } else {
                // Something happened in setting up the request that triggered an Error
                toast.error('An unexpected error occurred.', { id: toastId });
            }
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="form-header">
                    <h1>Create your account</h1>
                    <p>Join to explore and enjoy delicious meals.</p>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" id="firstName" name="firstName" className="form-input" placeholder=" " required />
                        <label htmlFor="firstName" className="form-label">FIRST NAME</label>
                    </div>
                    <div className="form-group">
                        <input type="text" id="lastName" name="lastName" className="form-input" placeholder=" " required />
                        <label htmlFor="lastName" className="form-label">LAST NAME</label>
                    </div>
                </div>
                <div className="form-group">
                    <input type="email" id="email" name="email" className="form-input" placeholder=" " required />
                    <label htmlFor="email" className="form-label">EMAIL</label>
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" className="form-input" placeholder=" " required />
                    <label htmlFor="password" className="form-label">PASSWORD</label>
                </div>
                <button type="submit" className="submit-btn">Sign Up</button>
                <div className="bottom-link">
                    <span>Already have an account? </span>
                    <Link to="/user/login">Sign in</Link>
                </div>
                <div className="bottom-link">
                    <Link to="/food-partner/register">Register as a Food Partner</Link>
                </div>
            </form>
        </div>
    );
};

export default UserRegister;