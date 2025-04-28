import React, { useState } from 'react';

import './userDashBoard.css';
import { ShoppingCart,Shield, Home, Clock, Heart, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExplorePakistan = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase(); // Highlight active icon
const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav-items">
          <button
            className={`sidebar-button ${currentPath === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <Home className="icon" />
            <span className="label">Dashboard</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/history' ? 'active' : ''}`}
            onClick={() => navigate('/history')}
          >
            <Clock className="icon" />
            <span className="label">History</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/budget' ? 'active' : ''}`}
            onClick={() => navigate('/budget')}
          >
            <ShoppingCart className="icon" />
            <span className="label">Budget</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/destinations' ? 'active' : ''}`}
            onClick={() => navigate('/destinations')}
          >
            <Heart className="icon" />
            <span className="label">Destinations</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/souvenirs' ? 'active' : ''}`}
            onClick={() => navigate('/souvenirs')}
          >
            <Gift className="icon" />
            <span className="label">Souvenirs</span>
          </button>
          <button
              className={`sidebar-button ${currentPath === '/safety-guidelines' ? 'active' : ''}`}
              onClick={() => navigate('/safetyguidelines')}
            >
              <Shield className="icon" />
              <span className="label">Safety</span>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="title">EXPLORE PAKISTAN</h1>
           <div className="cart-container">
                                <button className="cart-button" onClick={() => navigate('/budget')}>
                                  <ShoppingCart className="icon" />
                                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                                </button>
                              </div>
        </div>

        <div className="recommendation-section">
          <div className="recommendation-box">
            <h2 className="section-title">RECOMMENDATIONS</h2>

            <div className="cards">
              {/* Lahore */}
              <div className="city-card">
                <div className="card-content">
                  <h3 className="city-name">LAHORE</h3>
                  <p className="description">
                    Experience the cultural heart of Pakistan with historic monuments,
                    vibrant food streets, and the magnificent Badshahi Mosque.
                  </p>
                  <button 
                    className="explore-button" 
                    onClick={() => navigate('/destinations')}
                  >
                    Explore Destinations
                  </button>
                </div>
              </div>

              {/* Islamabad */}
              <div className="city-card">
                <div className="card-content">
                  <h3 className="city-name">ISLAMABAD</h3>
                  <p className="description">
                    Visit Pakistan's beautiful capital city with its stunning Faisal Mosque,
                    lush green Margalla Hills, and modern cityscape.
                  </p>
                  <button 
                    className="explore-button" 
                    onClick={() => navigate('/destinations')}
                  >
                    Explore Destinations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="about-us">
          <p>
            We have made this app to help people plan their trip to Pakistan's famous and beautiful locations. 
            Explore the cultural richness, breathtaking landscapes, and vibrant cities of Pakistan with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplorePakistan;