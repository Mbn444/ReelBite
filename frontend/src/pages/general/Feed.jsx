import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../../styles/reels.css';
import ReelItem from '../../components/ReelItem'; // <-- 1. Import the new component

const Feed = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const videoRefs = useRef(new Map());
    const containerRef = useRef(null);

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
                        entry.target.play().catch(() => console.log("Autoplay prevented"));
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
                const response = await axios.get("http://localhost:3000/api/food", { withCredentials: true });
                setVideos(response.data.foodItems || []);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch feed.");
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (loading) return <div>Loading Feed...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div ref={containerRef} className="reels-page">
            <div className="reels-feed" role="list">
                {/* --- 2. THE SIMPLIFIED MAPPING LOGIC --- */}
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