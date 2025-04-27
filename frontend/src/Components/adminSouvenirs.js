import React, { useState, useEffect } from 'react';
import './adminSouvenirs.css';
import { ShoppingCart, Home, Users, Map, Gift, Search, MapPin, Plus, Trash2, Edit, Save, X, Check, AlertTriangle, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminSouvenirs = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase();

  // Souvenirs data from your existing sample
  const [souvenirs, setSouvenirs] = useState([
    {
      province: "Punjab",
      items: [
        { 
          id: 1,
          name: "Lahori Khussas", 
          description: "Traditional handcrafted leather shoes with intricate embroidery", 
          location: "Best found in the walled city of Lahore, especially in Shahi Mohalla where artisans have been crafting them for generations.",
          price: 1500,
          image: "/api/placeholder/400/320",
          rating: 4.8,
          tags: ["handicraft", "traditional", "clothing"]
        }
      ]
    },
    {
      province: "Sindh",
      items: [
        { 
          id: 4,
          name: "Ajrak", 
          description: "Traditional block-printed textiles with unique patterns dating back 5,000 years", 
          location: "The town of Bhit Shah is renowned for its master Ajrak craftsmen who use natural dyes and traditional methods.",
          price: 1200,
          image: "/api/placeholder/400/320",
          rating: 4.9,
          tags: ["textile", "traditional", "art"]
        }
      ]
    },
    {
      province: "Khyber Pakhtunkhwa",
      items: [
        { 
          id: 7,
          name: "Peshawari Chappal", 
          description: "Handcrafted traditional sandals known for durability and distinctive design", 
          location: "The original craftsmen can be found in the Namak Mandi and Jahangirpura areas of Peshawar city.",
          price: 1800,
          image: "/api/placeholder/400/320",
          rating: 4.7,
          tags: ["handicraft", "traditional", "clothing"]
        }
      ]
    },
    {
      province: "Balochistan",
      items: [
        { 
          id: 10,
          name: "Balochi Embroidery", 
          description: "Intricate hand-embroidered textiles featuring mirror work and geometric patterns", 
          location: "The markets of Quetta showcase the finest examples, each piece taking months to complete by skilled artisans.",
          price: 3200,
          image: "/api/placeholder/400/320",
          rating: 4.9,
          tags: ["textile", "traditional", "art"]
        }
      ]
    },
    {
      province: "Gilgit-Baltistan",
      items: [
        { 
          id: 13,
          name: "Pashmina Shawls", 
          description: "Luxurious soft shawls made from mountain goat wool using ancient weaving methods", 
          location: "The high mountain villages near Skardu offer genuine pashmina directly from the families who raise the goats and weave the wool.",
          price: 6500,
          image: "/api/placeholder/400/320",
          rating: 5.0,
          tags: ["textile", "luxury", "clothing"]
        }
      ]
    }
  ]);

  // Create a flattened list of all souvenir items
  const allSouvenirItems = React.useMemo(() => 
    souvenirs.flatMap(province => 
      province.items.map(item => ({...item, province: province.province}))
    ), 
    [souvenirs]
  );

  // Admin state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(allSouvenirItems);
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // New souvenir form state
  const [newSouvenir, setNewSouvenir] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    image: "/api/placeholder/400/320",
    rating: 4.5,
    province: "",
    tags: []
  });
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");
  
  // Available tags for selection
  const availableTags = ["handicraft", "traditional", "clothing", "textile", "art", "home decor", "jewelry", "accessory", "luxury", "collectible"];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(amount);
  };

  // Get unique provinces for filter
  const provinces = ["All", ...new Set(souvenirs.map(province => province.province))];
  
  // Get unique tags/categories for filter
  const categories = ["All", ...new Set(allSouvenirItems.flatMap(item => item.tags))];

  // Handle search and filters
  useEffect(() => {
    let results = allSouvenirItems;
    
    // Apply search query
    if (searchQuery) {
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply province filter
    if (selectedProvince !== "All") {
      results = results.filter(item => item.province === selectedProvince);
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      results = results.filter(item => item.tags.includes(selectedCategory));
    }
    
    setFilteredItems(results);
  }, [searchQuery, selectedProvince, selectedCategory, allSouvenirItems]);

  // Show notification message
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };
// Removed the edit button from the UI by not rendering it in the admin actions
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSouvenir({
      ...newSouvenir,
      [name]: name === "price" || name === "rating" ? parseFloat(value) || "" : value
    });
  };

  // Add tag to new souvenir
  const addTag = () => {
    if (tagInput.trim() !== "" && !newSouvenir.tags.includes(tagInput.trim())) {
      setNewSouvenir({
        ...newSouvenir,
        tags: [...newSouvenir.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  // Remove tag from new souvenir
  const removeTag = (index) => {
    const updatedTags = [...newSouvenir.tags];
    updatedTags.splice(index, 1);
    setNewSouvenir({
      ...newSouvenir,
      tags: updatedTags
    });
  };

  // Add new souvenir
  const handleAddSouvenir = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!newSouvenir.name || !newSouvenir.description || !newSouvenir.location || 
        !newSouvenir.price || !newSouvenir.province || newSouvenir.tags.length === 0) {
      showNotification("Please fill all required fields", "error");
      return;
    }

    // Generate a unique ID
    const newId = Math.max(...allSouvenirItems.map(item => item.id), 0) + 1;
    
    // Create the new souvenir item
    const souvenirItem = {
      id: newId,
      name: newSouvenir.name,
      description: newSouvenir.description,
      location: newSouvenir.location,
      price: parseFloat(newSouvenir.price),
      image: "/api/placeholder/400/320",
      rating: parseFloat(newSouvenir.rating),
      tags: newSouvenir.tags
    };
    
    // Update the souvenirs data structure
    setSouvenirs(prevSouvenirs => {
      // Find if the province already exists
      const provinceIndex = prevSouvenirs.findIndex(p => p.province === newSouvenir.province);
      
      if (provinceIndex >= 0) {
        // Add to existing province
        const updatedSouvenirs = [...prevSouvenirs];
        updatedSouvenirs[provinceIndex] = {
          ...updatedSouvenirs[provinceIndex],
          items: [...updatedSouvenirs[provinceIndex].items, souvenirItem]
        };
        return updatedSouvenirs;
      } else {
        // Create new province
        return [...prevSouvenirs, {
          province: newSouvenir.province,
          items: [souvenirItem]
        }];
      }
    });
    
    // Reset form and hide it
    setNewSouvenir({
      name: "",
      description: "",
      location: "",
      price: "",
      image: "/api/placeholder/400/320",
      rating: 4.5,
      province: "",
      tags: []
    });
    setShowModal(false);
    showNotification(`${souvenirItem.name} has been added successfully`, "success");
  };

  // Open delete confirmation modal
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };

  // Delete souvenir
  const deleteSouvenir = () => {
    if (!itemToDelete) return;
    
    setSouvenirs(prevSouvenirs => {
      return prevSouvenirs.map(provinceData => {
        if (provinceData.province === itemToDelete.province) {
          return {
            ...provinceData,
            items: provinceData.items.filter(item => item.id !== itemToDelete.id)
          };
        }
        return provinceData;
      }).filter(provinceData => provinceData.items.length > 0); // Remove empty provinces
    });
    
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    showNotification(`${itemToDelete.name} has been deleted successfully`, "success");
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav-items">
          <button
            className={`sidebar-button ${currentPath === '/adminDashboard' ? 'active' : ''}`}
            onClick={() => navigate('/adminDashboard')}
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
          <h1 className="title">SOUVENIRS MANAGEMENT</h1>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="search-container">
            
            <input 
              type="text" 
              placeholder="Search souvenirs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="province-filter">Province:</label>
              <select 
                id="province-filter" 
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="filter-select"
              >
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="category-filter">Category:</label>
              <select 
                id="category-filter" 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button className="add-button" onClick={() => setShowModal(true)}>
            <Plus className="icon" />
            <span>Add Souvenir</span>
          </button>
        </div>

        {/* Notification */}
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {/* Souvenirs Grid */}
        <div className="admin-souvenirs-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="admin-souvenir-card">
                <div className="card-image">
                  <img src={item.image} alt={item.name} />
                  <div className="card-rating">
                    <span>★</span>
                    <span>{item.rating}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <div className="card-header">
                    <h3 className="card-title">{item.name}</h3>
                    <div className="card-location">
                      <MapPin className="location-icon" />
                      <span>{item.province}</span>
                    </div>
                  </div>
                  
                  <p className="card-description">{item.description}</p>
                  
                  <div className="card-tags">
                    {item.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="card-finder">
                    <h4>Where to Find:</h4>
                    <p className="location-info">{item.location}</p>
                  </div>
                  
                  <div className="card-footer">
                    <div className="card-price">
                      <span className="price-value">{formatCurrency(item.price)}</span>
                    </div>
                    
                    <div className="admin-actions">
                    
                      <button 
                        className="delete-button"
                        onClick={() => confirmDelete(item)}
                      >
                        <Trash2 className="trash-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No souvenirs found matching your search criteria.</p>
              <button 
                className="reset-button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedProvince("All");
                  setSelectedCategory("All");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Souvenir Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Souvenir</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <X className="icon" />
              </button>
            </div>
            <form onSubmit={handleAddSouvenir} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Souvenir Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g., Ajrak"
                    value={newSouvenir.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="province">Province *</label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    placeholder="e.g., Sindh"
                    value={newSouvenir.province}
                    onChange={handleInputChange}
                    required
                    list="provinces"
                  />
                  <datalist id="provinces">
                    {provinces.filter(p => p !== "All").map(province => (
                      <option key={province} value={province} />
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
                    value={newSouvenir.rating}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="price">Price (PKR) *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    value={newSouvenir.price}
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
                  placeholder="Write a brief description about this souvenir"
                  value={newSouvenir.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="location">Where to Find *</label>
                <textarea
                  id="location"
                  name="location"
                  placeholder="Where can tourists find this souvenir?"
                  value={newSouvenir.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Tags *</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    list="availableTags"
                  />
                  <datalist id="availableTags">
                    {availableTags.map(tag => (
                      <option key={tag} value={tag} />
                    ))}
                  </datalist>
                  <button type="button" onClick={addTag}>
                    <Tag className="icon" />
                  </button>
                </div>
                <div className="tags-list">
                  {newSouvenir.tags.map((tag, index) => (
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
                  Add Souvenir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="delete-confirm-modal">
            <div className="modal-header">
              <AlertTriangle className="warning-icon" />
              <h3>Confirm Deletion</h3>
            </div>
            
            <div className="modal-content">
              <p>Are you sure you want to delete <strong>{itemToDelete?.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-button"
                onClick={deleteSouvenir}
              >
                <Trash2 className="trash-icon" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSouvenirs;