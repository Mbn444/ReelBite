import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/CreateFood.css'; // We will create this CSS file next

const CreateFood = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Clean up the video preview URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (videoPreview) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            const previewUrl = URL.createObjectURL(file);
            setVideoPreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !videoFile) {
            setMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('video', videoFile);

        setLoading(true);
        setMessage('');

        try {
            await axios.post('http://localhost:3000/api/food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Crucial for sending authentication cookies
            });

            setMessage({ type: 'success', text: 'Video uploaded successfully! Redirecting...' });
            setTimeout(() => {
                navigate('/'); // Redirect to the main feed after 2 seconds
            }, 2000);

        } catch (error) {
            console.error('Upload failed:', error);
            const errorMsg = error.response?.data?.message || 'Upload failed. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-food-container">
            <div className="create-food-page">
                <form onSubmit={handleSubmit} className="upload-form">
                    <h2>Upload New Meal Video</h2>

                    <div className="form-group">
                        <label htmlFor="name">Meal Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Classic Cheeseburger"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the meal..."
                            rows="4"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="video">Upload Video</label>
                        <input
                            type="file"
                            id="video"
                            accept="video/mp4,video/quicktime,video/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {videoPreview && (
                        <div className="video-preview">
                            <p>Video Preview:</p>
                            <video src={videoPreview} controls width="100%" />
                        </div>
                    )}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Video'}
                    </button>

                    {message && (
                        <div className={`form-message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateFood;