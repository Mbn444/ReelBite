import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/VideoPlayerModal.css'; // We will create this CSS file

const VideoPlayerModal = ({ videos, startIndex, onClose }) => {
    const videoRefs = useRef(new Map());
    const observer = useRef(null);

    // Scroll to the clicked video as soon as the modal opens
    useEffect(() => {
        const startVideoElement = videoRefs.current.get(videos[startIndex]._id);
        if (startVideoElement) {
            startVideoElement.scrollIntoView({ block: 'center' });
        }
    }, [startIndex, videos]);

    const setVideoRef = (id, el) => {
        if (el) {
            videoRefs.current.set(id, el);
        } else {
            videoRefs.current.delete(id);
        }
    };

    // Set up the Intersection Observer for autoplay
    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const videoElement = entry.target;
                    if (entry.isIntersecting) {
                        videoElement.play().catch(e => console.error("Autoplay failed", e));
                    } else {
                        videoElement.pause();
                        videoElement.currentTime = 0; // Optional: Rewind video when it goes out of view
                    }
                });
            },
            { threshold: 0.5 }
        );

        const currentRefs = videoRefs.current;
        currentRefs.forEach(video => {
            if (video) observer.current.observe(video);
        });

        return () => {
            currentRefs.forEach(video => {
                if (video) observer.current.unobserve(video);
            });
            observer.current.disconnect();
        };
    }, [videos]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <button className="close-button" onClick={onClose}>&times;</button>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="reels-feed-modal">
                    {videos.map((video, index) => (
                        <section key={video._id} className="reel-modal">
                            <video
                                ref={(el) => setVideoRef(video._id, el)}
                                className="reel-video-modal"
                                src={video.video}
                                muted
                                playsInline
                                loop
                                preload="metadata"
                            />
                            <div className="reel-overlay-modal">
                                <div className="reel-content-modal">
                                    <p className="reel-description-modal">{video.description}</p>
                                    <Link to={`/food-partner/${video.foodPartner}`} className="reel-btn-modal">
                                        Place Your Order
                                    </Link>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerModal;