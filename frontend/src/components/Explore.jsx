import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import '../styles/Explore.css'; // Make sure you have created this CSS file

const Explore = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State to manage the video player modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    useEffect(() => {
        const fetchExploreData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/food/explore', { withCredentials: true });
                setVideos(response.data.foodItems || []);
            } catch (err) {
                setError("Could not load explore content. Please try again later.");
                console.error("Explore fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchExploreData();
    }, []);

    const handleThumbnailClick = (index) => {
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    };

    if (loading) {
        // Show a loading spinner while fetching data
        return <div className="explore-state-container"><div className="loader"></div></div>;
    }

    if (error) {
        // Show an error message if the API call fails
        return <div className="explore-state-container error">{error}</div>;
    }

    return (
        <div className="explore-page">
            <header className="explore-header">
                <h1>Explore</h1>
                <p>Discover new bites from our partners.</p>
            </header>
            <div className="explore-grid">
                {videos.map((video, index) => (
                    <button
                        key={video._id}
                        className="explore-item"
                        onClick={() => handleThumbnailClick(index)}
                        // This style adds the cool staggered animation effect
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <video
                            src={video.video}
                            muted
                            preload="metadata"
                            // Play the video on hover for a dynamic feel
                            onMouseOver={e => e.target.play()}
                            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                        />
                        <div className="explore-item-overlay"></div>
                    </button>
                ))}
            </div>

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

export default Explore;