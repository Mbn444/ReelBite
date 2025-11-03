import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to know the user's role
import VideoPlayerModal from '../../components/VideoPlayerModal';
import '../../styles/MyProfile.css';

const MyProfile = () => {
    const { authUser } = useAuth(); // Get the currently logged-in user
    const [profileData, setProfileData] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    useEffect(() => {
        // Decide which API endpoint to call based on the user's role
        const endpoint = authUser?.isFoodPartner
            ? 'http://localhost:3000/api/food-partner/me'
            : 'http://localhost:3000/api/auth/user/me'; // We will create this new, simpler endpoint

        const fetchMyProfileData = async () => {
            try {
                const response = await axios.get(endpoint, { withCredentials: true });
                // The structure of the response will be different for each role
                if (authUser?.isFoodPartner) {
                    setProfileData(response.data.partner);
                    setVideos(response.data.videos);
                } else {
                    setProfileData(response.data.user);
                    // Regular users have no videos, so we can leave this empty
                }
            } catch (err) {
                setError("Could not load your profile. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (authUser) {
            fetchMyProfileData();
        } else {
            setError("You must be logged in to view a profile.");
            setLoading(false);
        }
    }, [authUser]);

    const handleThumbnailClick = (index) => {
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    };

    if (loading) return <div className="profile-state-container"><div className="loader"></div></div>;
    if (error) return <div className="profile-state-container error">{error}</div>;
    if (!profileData) return <div className="profile-state-container error">Could not find your profile data.</div>;

    // --- Render a different UI based on the user's role ---
    if (authUser?.isFoodPartner) {
        // Food Partner Profile View
        return (
            <div className="my-profile-page">
                <header className="my-profile-header">
                    {/* ... Your existing beautiful Food Partner header ... */}
                </header>
                <main className="my-video-grid">
                    {/* ... Your existing video grid mapping ... */}
                </main>
                {isModalOpen && (
                    <VideoPlayerModal videos={videos} startIndex={selectedVideoIndex} onClose={() => setIsModalOpen(false)} />
                )}
            </div>
        );
    } else {
        // Regular User Profile View (A simpler version)
        return (
            <div className="my-profile-page">
                <header className="my-profile-header">
                    <div className="my-profile-info">
                         <img src="/default-avatar.png" alt={profileData.fullName} className="my-profile-picture" />
                        <div className="my-profile-details">
                            <h1 className="my-business-name">{profileData.fullName}</h1>
                            <p className="my-address">{profileData.email}</p>
                        </div>
                    </div>
                </header>
                <main>
                    <p style={{textAlign: 'center', color: '#b0aeb8'}}>More profile features coming soon!</p>
                </main>
            </div>
        );
    }
};

export default MyProfile;