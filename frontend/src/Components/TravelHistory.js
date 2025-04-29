import React, { useState } from 'react';
import './TravelHistory.css';
import { ShoppingCart,Shield, Home, Clock, Heart, Gift, Calendar, MapPin, BarChart,Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelHistory = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase(); // Highlight active icon
 const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');


  // Sample travel history data
  const travelHistory = [
    {
      id: 1,
      city: 'Hunza Valley',
      date: 'March 15, 2025',
      duration: '5 days',
      highlights: ['Altit Fort', 'Attabad Lake', 'Passu Cones'],
      rating: 5,
      
    },
    {
      id: 2,
      city: 'Swat Valley',
      date: 'January 10, 2025',
      duration: '3 days',
      highlights: ['Malam Jabba', 'Kalam', 'Mahodand Lake'],
      rating: 4,
      image: 'swat.jpg'
    },
    {
      id: 3,
      city: 'Karachi',
      date: 'November 25, 2024',
      duration: '4 days',
      highlights: ['Clifton Beach', 'Mazar-e-Quaid', 'Mohatta Palace'],
      rating: 4,
      image: 'karachi.jpg'
    }
  ];

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
            className={`sidebar-button ${currentPath === '/reports' ? 'active' : ''}`}
            onClick={() => navigate('/reports')}
          >
            <BarChart className="icon" />
            <span className="label">Reports</span>
          </button>
          <button
              className={`sidebar-button ${currentPath === '/safety-guidelines' ? 'active' : ''}`}
              onClick={() => navigate('/safety-guidelines')}
            >
              <Shield className="icon" />
              <span className="label">Safety</span>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="title">TRAVEL HISTORY</h1>
           <div className="cart-container">
                      <button className="cart-button" onClick={() => navigate('/budget')}>
                        <ShoppingCart className="icon" />
                        {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                      </button>
                    </div>
        </div>

        <div className="history-section">
          <div className="history-box">
            <h2 className="section-title">YOUR VISITED PLACES</h2>
            
          

            <div className="history-items">
              {travelHistory.map((trip) => (
                <div key={trip.id} className="history-card">
                  
                  <div className="card-details">
                    <div className="trip-header">
                      <h3 className="trip-city">{trip.city}</h3>
                      <div className="trip-rating">
                        {[...Array(trip.rating)].map((_, i) => (
                          <Star key={i} className="star-icon filled" size={16} />
                        ))}
                        {[...Array(5 - trip.rating)].map((_, i) => (
                          <Star key={i} className="star-icon" size={16} />
                        ))}
                      </div>
                    </div>
                    <div className="trip-info">
                      <div className="info-item">
                        <Calendar className="info-icon" size={16} />
                        <span>{trip.date}</span>
                      </div>
                      <div className="info-item">
                        <Clock className="info-icon" size={16} />
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                    <div className="trip-highlights">
                      <h4>Highlights:</h4>
                      <div className="highlights-list">
                        {trip.highlights.map((highlight, index) => (
                          <div key={index} className="highlight-item">
                            <MapPin className="highlight-icon" size={14} />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* No Travel History Message (hidden by default) */}
        <div className="no-history-message" style={{ display: 'none' }}>
          <div className="message-content">
            <Clock className="large-icon" size={48} />
            <h3>No Travel History Yet</h3>
            <p>You haven't visited any places in Pakistan yet. Start exploring to build your travel history!</p>
            <button className="explore-button" onClick={() => navigate('/dashboard')}>
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelHistory;