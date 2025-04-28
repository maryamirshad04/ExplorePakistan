import React, { useState, useEffect } from 'react';
import './souvenirs.css';
import { ShoppingCart,Shield, Home, Clock, Heart, Gift, Search, MapPin, Plus, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Souvenirs = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase(); // Highlight active icon

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
         
          
          tags: ["handicraft", "traditional", "clothing"]
        },
      /*  { 
          id: 2,
          name: "Pottery", 
          description: "Blue pottery from Multan with intricate designs inspired by Persian art", 
          location: "Visit the pottery workshops in Multan's old city to see artisans at work and purchase authentic pieces.",
          price: 900,
          image: "/api/placeholder/400/320",
          rating: 4.5,
          tags: ["handicraft", "home decor", "art"]
        },
        { 
          id: 3,
          name: "Phulkari", 
          description: "Colorful embroidered shawls and fabrics that represent Punjab's vibrant culture", 
          location: "Traditional markets in Amritsar and Patiala offer authentic Phulkari work made by skilled craftswomen.",
          price: 2500,
          image: "/api/placeholder/400/320",
          rating: 4.7,
          tags: ["textile", "traditional", "clothing"]
        }*/
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
         
          tags: ["textile", "traditional", "art"]
        },
      /*  { 
          id: 5,
          name: "Sindhi Topi", 
          description: "Traditional embroidered cap representing Sindhi heritage and hospitality", 
          location: "Available in markets throughout Hyderabad and Karachi, with the finest pieces found in Hala's handicraft shops.",
          price: 600,
          image: "/api/placeholder/400/320",
          rating: 4.3,
          tags: ["handicraft", "traditional", "clothing"]
        },
        { 
          id: 6,
          name: "Rilli", 
          description: "Colorful patchwork quilts made by women in rural Sindh using ancient techniques", 
          location: "The villages around Thatta and Tharparkar are famous for authentic Rilli work, with each piece telling a unique story.",
          price: 3500,
          image: "/api/placeholder/400/320",
          rating: 4.6,
          tags: ["textile", "home decor", "art"]
        }*/
      ]
    },
    {
      province: "Khyber Pakhtunkhwa",
      items: [
        { 
          id: 7,
          name:"Peshawari Chappal", 
          description: "Handcrafted traditional sandals known for durability and distinctive design", 
          location: "The original craftsmen can be found in the Namak Mandi and Jahangirpura areas of Peshawar city.",
          price: 1800,
          
          tags: ["handicraft", "traditional", "clothing"]
        },
       /* { 
          id: 8,
          name: "Tribal Jewelry", 
          description: "Unique silver jewelry with semi-precious stones that reflect tribal traditions", 
          location: "The bazaars of Peshawar and Swat Valley offer authentic pieces made by local silversmiths.",
          price: 4500,
          image: "/api/placeholder/400/320",
          rating: 4.8,
          tags: ["jewelry", "traditional", "accessory"]
        },
        { 
          id: 9,
          name: "Swati Shawls", 
          description: "Warm wool shawls with traditional patterns woven using age-old techniques", 
          location: "Visit Mingora and other towns in Swat Valley to purchase directly from weaving families who have practiced this craft for centuries.",
          price: 2200,
          image: "/api/placeholder/400/320",
          rating: 4.5,
          tags: ["textile", "traditional", "clothing"]
        }*/
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
         
          tags: ["textile", "traditional", "art"]
        },
       /* { 
          id: 11,
          name: "Marble Crafts", 
          description: "Decorative items crafted from local marble quarried from Balochistan's mountains", 
          location: "Small workshops in Chaman and Ziarat offer unique marble pieces carved by master craftsmen.",
          price: 1700,
          image: "/api/placeholder/400/320",
          rating: 4.4,
          tags: ["handicraft", "home decor", "collectible"]
        },
        { 
          id: 12,
          name: "Balochi Rugs", 
          description: "Hand-woven tribal pattern rugs made with natural dyes and traditional motifs", 
          location: "Rural communities around Kalat and Mastung are known for their exceptional rug weaving traditions.",
          price: 7500,
          image: "/api/placeholder/400/320",
          rating: 4.8,
          tags: ["textile", "home decor", "art"]
        }*/
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
          
          tags: ["textile", "luxury", "clothing"]
        },
       /* { 
          id: 14,
          name: "Hunza Gemstones", 
          description: "Natural gemstones from the northern mountains, including rare ruby and emerald varieties", 
          location: "Local lapidaries in Gilgit town and Hunza Valley sell stones sourced from nearby mountain mines.",
          price: 8500,
          image: "/api/placeholder/400/320",
          rating: 4.7,
          tags: ["jewelry", "collectible", "luxury"]
        },
        { 
          id: 15,
          name: "Walnut Wood Carvings", 
          description: "Intricately carved decorative items featuring traditional patterns and motifs", 
          location: "The woodcarving workshops of Baltistan, particularly in Shigar Valley, preserve centuries-old carving techniques.",
          price: 4200,
          image: "/api/placeholder/400/320",
          rating: 4.6,
          tags: ["handicraft", "home decor", "art"]
        }*/
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

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(allSouvenirItems);
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  // Add souvenir to cart
  const addToCart = (item) => {
    // This would integrate with your existing cart logic
    console.log(`Added ${item.name} to cart`);
    // For example: navigate('/budget', { state: { addItem: item } });
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
          <h1 className="title">TRADITIONAL SOUVENIRS</h1>
          <button className="cart-button" onClick={() => navigate('/budget')}>
            <ShoppingCart className="icon" />
          </button>
        </div>

        <div className="souvenirs-section">
          {/* Search and Filter Bar */}
          <div className="search-filter-container">
            <div className="search-bar">
             
              <input 
                type="text" 
                placeholder="Search souvenirs, crafts, locations..." 
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
          </div>

          {/* Souvenirs Grid */}
          <div className="souvenirs-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="souvenir-card">
                  <div className="card-image">
                    
                 
                  </div>
                  
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{item.name}</h3>
                      <div className="card-location">
                        <MapPin className="location-icon" />
                        <span>{item.province}</span>
                      </div>
                    </div>
                    
                  
                    
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
                        <span className="price-label">From</span>
                        <span className="price-value">{formatCurrency(item.price)}</span>
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
      </div>
    </div>
  );
};

export default Souvenirs;