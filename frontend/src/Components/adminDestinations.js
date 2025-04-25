import React, { useState, useEffect } from 'react';
import './adminDestinations.css';
import { Home, Users, Map, Gift, Search, Plus, Trash2, X, Check, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDestinations = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase();

  // Sample destinations data - using the same structure from destinations.js
  const [destinations, setDestinations] = useState([
    {
      id: 1,
      name: "Lahore",
      description: "Cultural hub with rich history and amazing food",
      image: "/api/placeholder/400/320",
      rating: 4.7,
      pricePerDay: 120,
      activities: ["City Tour", "Food Street Experience", "Lahore Fort Visit", "Shopping in Anarkali"],
      region: "Punjab",
      tags: ["historical", "city", "cultural"]
    },
    {
      id: 2,
      name: "Hunza Valley",
      description: "Breathtaking mountain landscapes and serene environment",
      image: "/api/placeholder/400/320",
      rating: 4.9,
      pricePerDay: 150,
      activities: ["Hiking", "Boat Ride at Attabad Lake", "Baltit Fort Visit", "Local Cuisine Experience"],
      region: "Gilgit-Baltistan",
      tags: ["mountains", "nature", "adventure"]
    },
    {
      id: 3,
      name: "Swat Valley",
      description: "The Switzerland of Pakistan with lush green meadows",
      image: "/api/placeholder/400/320",
      rating: 4.8,
      pricePerDay: 135,
      activities: ["Kalam Visit", "Mahodand Lake Trek", "White Water Rafting", "Local Cuisine"],
      region: "Khyber Pakhtunkhwa",
      tags: ["mountains", "nature", "adventure"]
    },
    {
      id: 4,
      name: "Karachi",
      description: "Bustling metropolis with beautiful beaches and seafood",
      image: "/api/placeholder/400/320",
      rating: 4.5,
      pricePerDay: 145,
      activities: ["Clifton Beach Visit", "Port Grand", "National Museum", "Boat Trip"],
      region: "Sindh",
      tags: ["city", "beach", "metropolitan"]
    },
    {
      id: 5,
      name: "Islamabad",
      description: "Green and peaceful capital city with modern infrastructure",
      image: "/api/placeholder/400/320",
      rating: 4.6,
      pricePerDay: 130,
      activities: ["Faisal Mosque", "Margalla Hills Trek", "Daman-e-Koh", "Pakistan Monument"],
      region: "Federal Territory",
      tags: ["city", "modern", "peaceful"]
    },
    {
      id: 6,
      name: "Murree",
      description: "Popular hill station with pine forests and cool climate",
      image: "/api/placeholder/400/320",
      rating: 4.4,
      pricePerDay: 110,
      activities: ["Mall Road", "Chair Lift", "Pindi Point", "Kashmir Point"],
      region: "Punjab",
      tags: ["mountains", "hill station", "family"]
    }
  ]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState(destinations);

  // Modal state for adding new destination
  const [showModal, setShowModal] = useState(false);
  const [newDestination, setNewDestination] = useState({
    id: null,
    name: "",
    description: "",
    image: "/api/placeholder/400/320",
    rating: 4.0,
    pricePerDay: 100,
    activities: [],
    region: "",
    tags: []
  });

  // Activity and tag input states
  const [activityInput, setActivityInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  // Notification state
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Handle search
  useEffect(() => {
    if (searchQuery) {
      const results = destinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(results);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchQuery, destinations]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination({
      ...newDestination,
      [name]: name === "pricePerDay" || name === "rating" ? parseFloat(value) : value
    });
  };

  // Add activity to new destination
  const addActivity = () => {
    if (activityInput.trim() !== "") {
      setNewDestination({
        ...newDestination,
        activities: [...newDestination.activities, activityInput.trim()]
      });
      setActivityInput("");
    }
  };

  // Remove activity from new destination
  const removeActivity = (index) => {
    const updatedActivities = [...newDestination.activities];
    updatedActivities.splice(index, 1);
    setNewDestination({
      ...newDestination,
      activities: updatedActivities
    });
  };

  // Add tag to new destination
  const addTag = () => {
    if (tagInput.trim() !== "" && !newDestination.tags.includes(tagInput.trim())) {
      setNewDestination({
        ...newDestination,
        tags: [...newDestination.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  // Remove tag from new destination
  const removeTag = (index) => {
    const updatedTags = [...newDestination.tags];
    updatedTags.splice(index, 1);
    setNewDestination({
      ...newDestination,
      tags: updatedTags
    });
  };

  // Handle add destination form submission
  const handleAddDestination = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!newDestination.name || !newDestination.description || !newDestination.region) {
      showNotification("Please fill in all required fields", "error");
      return;
    }
    
    if (newDestination.activities.length === 0) {
      showNotification("Please add at least one activity", "error");
      return;
    }
    
    if (newDestination.tags.length === 0) {
      showNotification("Please add at least one tag", "error");
      return;
    }
    
    // Add new destination with unique ID
    const maxId = Math.max(...destinations.map(dest => dest.id), 0);
    const destinationToAdd = {
      ...newDestination,
      id: maxId + 1
    };
    
    setDestinations([...destinations, destinationToAdd]);
    setShowModal(false);
    showNotification(`${destinationToAdd.name} has been added successfully`, "success");
    
    // Reset form
    setNewDestination({
      id: null,
      name: "",
      description: "",
      image: "/api/placeholder/400/320",
      rating: 4.0,
      pricePerDay: 100,
      activities: [],
      region: "",
      tags: []
    });
  };

  // Handle delete destination
  const handleDeleteDestination = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updatedDestinations = destinations.filter(dest => dest.id !== id);
      setDestinations(updatedDestinations);
      showNotification(`${name} has been deleted successfully`, "success");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(amount);
  };

  // Get unique regions for dropdown
  const regions = [...new Set(destinations.map(dest => dest.region))];

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav-items">
          <button
            className={`sidebar-button ${currentPath === '/adminDashBoard' ? 'active' : ''}`}
            onClick={() => navigate('/adminDashBoard')}
          >
            <Home className="icon" />
            <span className="label">Dashboard</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/adminUsers' ? 'active' : ''}`}
            onClick={() => navigate('/adminUsers')}
          >
            <Users className="icon" />
            <span className="label">Users</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/adminDestinations' ? 'active' : ''}`}
            onClick={() => navigate('/adminDestinations')}
          >
            <Map className="icon" />
            <span className="label">Destinations</span>
          </button>

          <button
            className={`sidebar-button ${currentPath === '/adminSouvenirs' ? 'active' : ''}`}
            onClick={() => navigate('/adminSouvenirs')}
          >
            <Gift className="icon" />
            <span className="label">Souvenirs</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="title">DESTINATIONS MANAGEMENT</h1>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search destinations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button className="add-button" onClick={() => setShowModal(true)}>
            <Plus className="icon" />
            <span>Add Destination</span>
          </button>
        </div>

        {/* Notification */}
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* Destinations Table */}
        <div className="table-container">
          <table className="destinations-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Region</th>
                <th>Rating</th>
                <th>Price per Day</th>
                <th>Activities</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDestinations.length > 0 ? (
                filteredDestinations.map(destination => (
                  <tr key={destination.id}>
                    <td>{destination.id}</td>
                    <td>{destination.name}</td>
                    <td>{destination.region}</td>
                    <td>{destination.rating}</td>
                    <td>{formatCurrency(destination.pricePerDay)}</td>
                    <td>
                      <div className="table-list">
                        {destination.activities.slice(0, 2).join(", ")}
                        {destination.activities.length > 2 && ` + ${destination.activities.length - 2} more`}
                      </div>
                    </td>
                    <td>
                      <div className="tag-list">
                        {destination.tags.map((tag, index) => (
                          <span key={index} className="table-tag">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteDestination(destination.id, destination.name)}
                      >
                        <Trash2 className="icon" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-results">No destinations found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Destination Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Destination</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <X className="icon" />
              </button>
            </div>
            <form onSubmit={handleAddDestination} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Destination Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g., Murree"
                    value={newDestination.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="region">Region *</label>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    placeholder="e.g., Punjab"
                    value={newDestination.region}
                    onChange={handleInputChange}
                    required
                    list="regions"
                  />
                  <datalist id="regions">
                    {regions.map((region, index) => (
                      <option key={index} value={region} />
                    ))}
                  </datalist>
                </div>
                
                <div className="form-group">
                  <label htmlFor="rating">Rating (1-5) *</label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    step="0.1"
                    value={newDestination.rating}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="pricePerDay">Price Per Day (PKR) *</label>
                  <input
                    type="number"
                    id="pricePerDay"
                    name="pricePerDay"
                    min="1"
                    value={newDestination.pricePerDay}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Write a brief description about this destination"
                  value={newDestination.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Activities *</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    placeholder="Add an activity"
                    value={activityInput}
                    onChange={(e) => setActivityInput(e.target.value)}
                  />
                  <button type="button" onClick={addActivity}>
                    <Plus className="icon" />
                  </button>
                </div>
                <div className="items-list">
                  {newDestination.activities.map((activity, index) => (
                    <div key={index} className="item">
                      <span>{activity}</span>
                      <button type="button" onClick={() => removeActivity(index)}>
                        <X className="icon" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-group full-width">
                <label>Tags *</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <button type="button" onClick={addTag}>
                    <Tag className="icon" />
                  </button>
                </div>
                <div className="tags-list">
                  {newDestination.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      <span>{tag}</span>
                      <button type="button" onClick={() => removeTag(index)}>
                        <X className="icon" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  <Check className="icon" />
                  Add Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDestinations;