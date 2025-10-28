import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Profile.css';
import VideoPlayerModal from '../../components/VideoPlayerModal'; // <-- Import the new modal

const Profile = () => {
    const { profile: partnerId } = useParams();
    const [partner, setPartner] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!partnerId) {
                setLoading(false);
                setError("Partner ID is missing.");
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/api/food-partner/${partnerId}`);
                setPartner(response.data.partner);
                setVideos(response.data.videos);
            } catch (err) {
                setError("Could not fetch profile data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfileData();
    }, [partnerId]);

    // Function to handle clicking a thumbnail
    const handleThumbnailClick = (index) => {
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    };

    if (loading) return <div className="loading-state">Loading Profile...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!partner) return <div className="error-state">Food partner not found.</div>;

    return (
        <div className="profile-container">
            <div className="profile-page">
                <header className="profile-header">
                    <div className="profile-info">
                        <img src={partner.profilePictureUrl || '/default-avatar.png'} alt={partner.name} className="profile-picture" />
                        <div className="profile-details">
                            <h1 className="business-name">{partner.name}</h1>
                            <p className="address">{partner.address}</p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-value">{videos.length}</span>
                            <span className="stat-label">total meals</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">15K</span>
                            <span className="stat-label">customer served</span>
                        </div>
                    </div>
                </header>

                <main className="video-grid">
                    {videos.map((video, index) => (
                        <button key={video._id} className="video-thumbnail-button" onClick={() => handleThumbnailClick(index)}>
                            <video src={video.video} preload="metadata" />
                        </button>
                    ))}
                </main>
            </div>

            {/* Conditionally render the modal */}
            {isModalOpen && (
                <VideoPlayerModal
                    videos={videos}
                    startIndex={selectedVideoIndex}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Profile;