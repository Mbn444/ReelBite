import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/reels.css';
import ReelItem from '../../components/ReelItem';

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRefs = useRef(new Map());

    const setVideoRef = (id) => (el) => {
        if (el) {
            videoRefs.current.set(id, el);
        } else {
            videoRefs.current.delete(id);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.play().catch(e => console.log("Autoplay was prevented", e));
                    } else {
                        entry.target.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        const currentRefs = videoRefs.current;
        currentRefs.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => {
            currentRefs.forEach((video) => {
                if (video) observer.unobserve(video);
            });
        };
    }, [videos]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true); // Start loading
                const response = await axios.get("http://localhost:3000/api/food", { withCredentials: true });
                setVideos(response.data.foodItems || []);
            } catch (err) {
                console.error("Failed to fetch feed:", err);
                setError("Failed to fetch the feed. Please try again later.");
            } finally {
                setLoading(false); // Stop loading, regardless of success or error
            }
        };
        fetchVideos();
    }, []);

    // --- THIS IS THE FIX ---
    // Provide clear feedback to the user based on the state.
    if (loading) {
        return <div style={{ color: 'white', textAlign: 'center', paddingTop: '100px', fontSize: '1.5rem' }}>Loading Reels...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', paddingTop: '100px', fontSize: '1.5rem' }}>{error}</div>;
    }

    return (
        <div className="reels-page">
            <div className="reels-feed" role="list">
                {videos.map(video => (
                    <ReelItem
                        key={video._id}
                        video={video}
                        setVideoRef={setVideoRef(video._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Feed;