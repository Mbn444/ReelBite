import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// We'll pass the setVideoRef function from the parent as a prop
const ReelItem = ({ video, setVideoRef }) => {
    // State to track if the description is expanded for THIS reel
    const [isExpanded, setIsExpanded] = useState(false);

    // --- The Logic for Truncating Text ---
    const descriptionLimit = 120; // Max characters to show initially
    const isLongDescription = video.description.length > descriptionLimit;

    // Determine what text to display based on the state
    const displayText = isLongDescription && !isExpanded
        ? `${video.description.substring(0, descriptionLimit)}...`
        : video.description;

    // A function to toggle the expanded state, but only for long descriptions
    const toggleDescription = () => {
        if (isLongDescription) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <section className="reel">
            <video
                ref={setVideoRef} // Assign the ref passed down from the parent
                className="reel-video"
                src={video.video}
                muted
                playsInline
                loop
                preload="metadata"
            />
            <div className="reel-overlay">
                <div className="reel-content">
                    <p
                        className={`reel-description ${isLongDescription ? 'expandable' : ''}`}
                        onClick={toggleDescription}
                    >
                        {displayText}
                    </p>
                    <Link to={`/food-partner/${video.foodPartner}`} className="reel-btn">
                        Visit Store
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ReelItem;