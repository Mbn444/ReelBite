import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/reels.css';

const Feed  = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observer = useRef(null);

  const setItemRef = (element) => {
    if (!element) return;

    if (!observer.current) {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoElement = entry.target;
            if (entry.isIntersecting) {
              videoElement.play().catch(error => console.log("Autoplay prevented:", error));
            } else {
              videoElement.pause();
            }
          });
        },
        {
          threshold: 0.5
        }
      );
    }
    observer.current.observe(element);
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", { withCredentials: true });
        if (!isCancelled) {
          if (response.data && Array.isArray(response.data.foodItems)) {
            setItems(response.data.foodItems);
          } else {
            setError("Data from server was not in the correct format.");
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Failed to fetch videos. Please check your connection or try again later.");
          console.error("API Error:", err);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {items.map(item => (
          <section key={item._id || item.id} className="reel" role="listitem">
            <video
              ref={setItemRef}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />
            <div className="reel-overlay">
              <div className="reel-content">
                <p className="reel-description">
                  {item.description}
                </p>
                {item.foodPartner && (
                  <Link to={`/food-partner/${item.foodPartner}`} className="reel-btn">
                    Visit Store
                  </Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Feed ;