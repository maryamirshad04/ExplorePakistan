import React, { useState } from 'react';
import './budgetCalculator.css';
import { ShoppingCart, Home, Clock, Heart, Gift, Trash2, Plus, Minus, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BudgetCalculator = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase(); // Highlight active icon

  // Sample travel cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      destination: "Lahore",
      duration: 3,
      accommodation: "4-Star Hotel",
      transportType: "Domestic Flight",
      activities: ["City Tour", "Food Street Experience"],
      pricePerDay: 120,
      accommodationCost: 300,
      transportCost: 150,
      activityCosts: 80
    },
    {
      id: 2,
      destination: "Hunza Valley",
      duration: 4,
      accommodation: "Luxury Resort",
      transportType: "Private Car",
      activities: ["Hiking", "Boat Ride at Attabad Lake", "Baltit Fort Visit"],
      pricePerDay: 150,
      accommodationCost: 600,
      transportCost: 350,
      activityCosts: 120
    }
  ]);

  // Function to calculate subtotal for an item
  const calculateItemTotal = (item) => {
    const dailyCost = item.pricePerDay * item.duration;
    return dailyCost + item.accommodationCost + item.transportCost + item.activityCosts;
  };

  // Function to calculate the cart total
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  // Function to handle quantity changes
  const handleDurationChange = (id, increment) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newDuration = Math.max(1, item.duration + increment);
          return { ...item, duration: newDuration };
        }
        return item;
      })
    );
  };

  // Function to remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Currency formatter
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(amount);
  };

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
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="title">BUDGET CALCULATOR</h1>
          <button className="cart-button">
            <ShoppingCart className="icon" />
            <span className="cart-count">{cartItems.length}</span>
          </button>
        </div>

        <div className="budget-section">
          <div className="budget-container">
            <div className="budget-header">
              <h2 className="section-title">TRIP BUDGET ESTIMATOR</h2>
              <button className="save-button">
                <Calculator className="button-icon" />
                <span>Save Estimate</span>
              </button>
            </div>
            
            {/* Travel Cart */}
            <div className="cart-table-container">
              <table className="cart-table">
                <thead className="table-header">
                  <tr>
                    <th className="text-left">Destination</th>
                    <th className="text-center">Duration (Days)</th>
                    <th className="text-left">Accommodation</th>
                    <th className="text-left">Transport</th>
                    <th className="text-center">Cost Per Day</th>
                    <th className="text-right">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="cart-item">
                      <td className="destination-cell">
                        <div className="destination-name">{item.destination}</div>
                        <div className="activities-list">
                          Activities: {item.activities.join(", ")}
                        </div>
                      </td>
                      <td className="duration-cell">
                        <div className="duration-controls">
                          <button 
                            onClick={() => handleDurationChange(item.id, -1)}
                            className="counter-button"
                            disabled={item.duration <= 1}
                          >
                            <Minus className="counter-icon" />
                          </button>
                          <span className="duration-value">{item.duration}</span>
                          <button 
                            onClick={() => handleDurationChange(item.id, 1)}
                            className="counter-button"
                          >
                            <Plus className="counter-icon" />
                          </button>
                        </div>
                      </td>
                      <td>{item.accommodation}</td>
                      <td>{item.transportType}</td>
                      <td className="text-center">{formatCurrency(item.pricePerDay)}</td>
                      <td className="item-total">{formatCurrency(calculateItemTotal(item))}</td>
                      <td className="remove-cell">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="remove-button"
                        >
                          <Trash2 className="remove-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {cartItems.length === 0 && (
                    <tr className="empty-cart">
                      <td colSpan="7">
                        Your travel cart is empty. Add destinations to calculate your budget.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Cost Summary Section */}
            <div className="cost-summary-section">
              <div className="cost-breakdown">
                <h3 className="summary-title">Cost Breakdown</h3>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="breakdown-item">
                    <h4 className="breakdown-title">{item.destination}</h4>
                    <div className="breakdown-details">
                      <div className="breakdown-row">
                        <span>Daily Expenses ({item.duration} days × {formatCurrency(item.pricePerDay)})</span>
                        <span>{formatCurrency(item.duration * item.pricePerDay)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Accommodation</span>
                        <span>{formatCurrency(item.accommodationCost)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Transportation</span>
                        <span>{formatCurrency(item.transportCost)}</span>
                      </div>
                      <div className="breakdown-row">
                        <span>Activities</span>
                        <span>{formatCurrency(item.activityCosts)}</span>
                      </div>
                      <div className="breakdown-row subtotal">
                        <span>Subtotal</span>
                        <span>{formatCurrency(calculateItemTotal(item))}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Total Summary */}
              <div className="total-summary">
                <h3 className="summary-title">Total Summary</h3>
                
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(calculateCartTotal())}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (5%)</span>
                    <span>{formatCurrency(calculateCartTotal() * 0.05)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Service Fee</span>
                    <span>{formatCurrency(50)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>{formatCurrency(calculateCartTotal() * 1.05 + 50)}</span>
                  </div>
                  
                  <button className="checkout-button">
                    Proceed to Checkout
                  </button>
                  
                  <button className="add-more-button">
                    Add More Destinations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;