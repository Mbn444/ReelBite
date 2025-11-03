import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import '../../styles/MyProfile.css'; // We will create this file next

const MyProfile = () => {
    const [partner, setPartner] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    useEffect(() => {
        const fetchMyProfileData = async () => {
            try {
                // Call the new '/me' endpoint to get the current user's data
                const response = await axios.get('http://localhost:3000/api/food-partner/me', { withCredentials: true });
                setPartner(response.data.partner);
                setVideos(response.data.videos);
            } catch (err) {
                setError("Could not load your profile. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProfileData();
    }, []); // Empty dependency array means this runs once on component mount

    const handleThumbnailClick = (index) => {
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className="profile-loading">Loading Your Profile...</div>;
    }

    if (error) {
        return <div className="profile-error">{error}</div>;
    }
    
    // Check if partner data exists before trying to render it
    if (!partner) {
        return <div className="profile-error">Could not find your profile data.</div>
    }

    return (
        <div className="my-profile-page">
            <header className="my-profile-header">
                <div className="my-profile-info">
                    <img src={partner.profilePictureUrl || '/default-avatar.png'} alt={partner.businessName} className="my-profile-picture" />
                    <div className="my-profile-details">
                        <h1 className="my-business-name">{partner.businessName}</h1>
                        <p className="my-address">{partner.address}</p>
                        {/* We could add an "Edit Profile" button here later */}
                    </div>
                </div>
                <div className="my-profile-stats">
                    <div className="my-stat-item">
                        <span className="my-stat-value">{videos.length}</span>
                        <span className="my-stat-label">total meals</span>
                    </div>
                    <div className="my-stat-item">
                        <span className="my-stat-value">15K</span>
                        <span className="my-stat-label">customer served</span>
                    </div>
                </div>
            </header>

            <main className="my-video-grid">
                {videos.map((video, index) => (
                    <button key={video._id} className="my-video-thumbnail" onClick={() => handleThumbnailClick(index)}>
                        <video src={video.video} muted preload="metadata" />
                    </button>
                ))}
            </main>

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

export default MyProfile;