import React from 'react';
import { ShoppingCart, Shield, Home, Clock, Heart, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './safetyGuidelines.css';

const SafetyGuidelines = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase();
  const [cart, setCart] = React.useState([]);

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
          <h1 className="title">EXPLORE PAKISTAN</h1>
          <div className="cart-container">
            <button className="cart-button" onClick={() => navigate('/budget')}>
              <ShoppingCart className="icon" />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
        
        {/* Safety Guidelines Content */}
        <div className="safety-guidelines">
          <h2 className="section-title">SAFETY GUIDELINES</h2>
          
          <div className="guidelines-container">
            <div className="guideline-category">
              <h3 className="guideline-heading">General Safety</h3>
              <ul className="guideline-list">
                <li>Always keep copies of important documents like passport and visa</li>
                <li>Register with your embassy or consulate upon arrival</li>
                <li>Stay updated with local news and travel advisories</li>
                <li>Purchase comprehensive travel insurance before your trip</li>
                <li>Share your itinerary with family or friends</li>
              </ul>
            </div>
            
            <div className="guideline-category">
              <h3 className="guideline-heading">Health Precautions</h3>
              <ul className="guideline-list">
                <li>Carry a basic first aid kit with necessary medications</li>
                <li>Drink only bottled or purified water</li>
                <li>Be cautious with street food and uncooked items</li>
                <li>Protect yourself from mosquitoes in rural areas</li>
                <li>Know the location of the nearest hospital or medical facility</li>
              </ul>
            </div>
            
            <div className="guideline-category">
              <h3 className="guideline-heading">Transportation Safety</h3>
              <ul className="guideline-list">
                <li>Use reputable transportation services</li>
                <li>Avoid traveling alone at night in unfamiliar areas</li>
                <li>Keep emergency contact numbers handy</li>
                <li>Be extra cautious when crossing roads in busy cities</li>
                 <li>Consider hiring local guides for remote locations </li>
              </ul>
            </div>
            
            <div className="guideline-category">
              <h3 className="guideline-heading">Cultural Awareness</h3>
              <ul className="guideline-list">
                <li>Respect local customs and dress modestly, especially at religious sites</li>
                <li>Ask permission before photographing people</li>
                <li>Learn basic phrases in Urdu or local languages</li>
                <li>Be mindful of local religious practices and holidays</li>
                <li>Remove shoes when entering mosques and homes</li>
              </ul>
            </div>
          </div>
          
          <div className="emergency-contacts">
            <h3 className="guideline-heading">Emergency Contacts</h3>
            <div className="contact-cards">
              <div className="contact-card">
                <h4>Police</h4>
                <p className="contact-number">15</p>
              </div>
              <div className="contact-card">
                <h4>Ambulance</h4>
                <p className="contact-number">1122</p>
              </div>
              <div className="contact-card">
                <h4>Tourist Police</h4>
                <p className="contact-number">1422</p>
              </div>
              <div className="contact-card">
                <h4>Highway Emergency</h4>
                <p className="contact-number">130</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyGuidelines;