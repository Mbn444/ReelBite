import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayerModal from '../../components/VideoPlayerModal';
import '../../styles/Explore.css'; // We will create this file next

const Explore = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    useEffect(() => {
        const fetchExploreData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/food/explore', { withCredentials: true });
                setVideos(response.data.foodItems || []);
            } catch (err) {
                setError("Could not load explore content. Please try again later.");
                console.error(err);
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
        return <div className="explore-loading">Loading...</div>;
    }

    if (error) {
        return <div className="explore-error">{error}</div>;
    }

    return (
        <div className="explore-page">
            <h1>Explore</h1>
            <div className="explore-grid">
                {videos.map((video, index) => (
                    <button key={video._id} className="explore-item" onClick={() => handleThumbnailClick(index)}>
                        <video
                            src={video.video}
                            muted
                            preload="metadata"
                            onMouseOver={e => e.target.play()}
                            onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                        />
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