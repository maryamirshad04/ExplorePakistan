import React, { useState, useEffect } from 'react';
import './adminUsers.css';
import { Home,Shield, BarChart2, Users, Map, Gift, Search, Trash2, Edit, UserX, UserCheck, AlertTriangle, User, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/adminApi';

const AdminUsers = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase();

  // State for user list
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Load users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await api.fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Filter users based on search term
  useEffect(() => {
    const searchUsers = async () => {
      if (searchTerm.trim() === '') {
        try {
          const data = await api.fetchUsers();
          setFilteredUsers(data);
        } catch (err) {
          setError(err.message);
        }
      } else {
        try {
          const data = await api.searchUsers(searchTerm);
          setFilteredUsers(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    
    const timer = setTimeout(() => {
      searchUsers();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Handle direct user deletion from list
  const handleListDelete = async (uid) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const result = await api.deleteUser(uid);
        
        if (result.status === 'success') {
          // Update the users list
          const updatedUsers = users.filter(user => user.uid !== uid);
          setUsers(updatedUsers);
          setFilteredUsers(updatedUsers);
          alert(result.message);
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // Handle deletion by name and email
  const handleDeleteByDetails = async (name, email) => {
    try {
      const result = await api.deleteUserByDetails(name, email);
      
      if (result.status === 'success') {
        // Update the users list
        const updatedUsers = users.filter(user => user.id !== result.deletedUser.id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        
        return result; // Return result to handle in the DeleteUserForm component
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      throw err; // Throw the error to handle in the DeleteUserForm component
    }
  };

  // Toggle user status
  const toggleUserStatus = async (uid) => {
    try {
      const result = await api.toggleUserStatus(uid);
      
      if (result.status === 'success') {
        // Update the users list
        const updatedUsers = users.map(user => {
          if (user.uid === uid) {
            return { ...user, status: result.newStatus };
          }
          return user;
        });
        
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle user edit (to be implemented)
  const handleEditUser = (user) => {
    // Implement edit functionality
    console.log('Edit user:', user);
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="nav-items">
          <button className={`sidebar-button ${currentPath === '/adminDashBoard' ? 'active' : ''}`} onClick={() => navigate('/adminDashBoard')}>
            <Home className="icon" />
            <span className="label">Dashboard</span>
          </button>
          <button className={`sidebar-button ${currentPath === '/adminUsers' ? 'active' : ''}`} onClick={() => navigate('/adminUsers')}>
            <Users className="icon" />
            <span className="label">Users</span>
          </button>
          <button className={`sidebar-button ${currentPath === '/adminDestinations' ? 'active' : ''}`} onClick={() => navigate('/adminDestinations')}>
            <Map className="icon" />
            <span className="label">Destinations</span>
          </button>
          <button className={`sidebar-button ${currentPath === '/adminSouvenirs' ? 'active' : ''}`} onClick={() => navigate('/adminSouvenirs')}>
            <Gift className="icon" />
            <span className="label">Souvenirs</span>
          </button>
          <button
              className={`sidebar-button ${currentPath.includes('adminsafety') ? 'active' : ''}`}
              onClick={() => navigate('/adminSafetyGuidelines')}
            >
              <Shield className="icon" />
              <span className="label">Safety</span>
            </button>
        
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1 className="title">USER MANAGEMENT</h1>
        </div>

        {/* Main content layout */}
        <div className="admin-users-content">
          {/* User list section */}
          <div className="chart-container users-list-container">
            <div className="chart-header">
              <h2 className="chart-title">User List</h2>
              <div className="search-wrapper">
                <div className="search-bar">
                  <Search className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="bookings-table users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.uid} className={user.status === 'Inactive' ? 'inactive-user' : ''}>
                      <td>#{user.uid}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joinDate}</td>
                      <td className="action-buttons">
                        <button 
                          className="action-btn status-btn"
                          onClick={() => toggleUserStatus(user.uid)}
                          title={user.status === 'Active' ? "Deactivate User" : "Activate User"}
                        >
                          {user.status === 'Active' ? 
                            <UserX className="action-icon" /> : 
                            <UserCheck className="action-icon" />
                          }
                        </button>
                        <button 
                          className="action-btn edit-btn"
                          title="Edit User"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="action-icon" />
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleListDelete(user.uid)}
                          title="Delete User"
                        >
                          <Trash2 className="action-icon" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Delete User Form with improved styling */}
          <DeleteUserForm onDeleteUser={handleDeleteByDetails} />
        </div>
      </div>
    </div>
  );
};

// The DeleteUserForm component needs to be implemented based on the CSS
const DeleteUserForm = ({ onDeleteUser }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!userName.trim() || !userEmail.trim()) {
      setError('Please fill in both name and email fields');
      return;
    }
    
    // Show confirmation dialog
    setUserToDelete({ name: userName, email: userEmail });
    setShowConfirmation(true);
  };

  // Handle actual deletion after confirmation
  const confirmDeletion = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await onDeleteUser(userToDelete.name, userToDelete.email);
      setSuccess(result.message || 'User successfully deleted');
      // Reset form
      setUserName('');
      setUserEmail('');
      // Close confirmation dialog
      setShowConfirmation(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel deletion
  const cancelDeletion = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  return (
    <div className="delete-user-container">
      <div className="chart-header">
        <h2 className="chart-title">Delete User</h2>
      </div>
      
      <div className="delete-form-wrapper">
        {error && (
          <div className="error-message">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            <AlertTriangle size={16} />
            {success}
          </div>
        )}
        
        <form className="delete-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">
              <User className="form-icon" size={16} />
              User Name
            </label>
            <input
              type="text"
              id="userName"
              placeholder="Enter full name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="userEmail">
              <Mail className="form-icon" size={16} />
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              placeholder="Enter email address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="form-notice">
            <p>Please ensure you have the correct user details before proceeding. This action cannot be undone.</p>
          </div>
          
          <button 
            type="submit" 
            className="delete-user-btn"
            disabled={isSubmitting || !userName.trim() || !userEmail.trim()}
          >
            <Trash2 size={16} />
            Delete User
          </button>
        </form>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>Confirm User Deletion</h3>
            <p>Are you sure you want to delete the following user?</p>
            
            <div className="user-detail">
              <p><strong>Name:</strong> {userToDelete.name}</p>
              <p><strong>Email:</strong> {userToDelete.email}</p>
            </div>
            
            <div className="warning-message">
              <p>This action cannot be undone. All user data will be permanently removed from the system.</p>
            </div>
            
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={cancelDeletion}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                className="confirm-delete-btn"
                onClick={confirmDeletion}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;