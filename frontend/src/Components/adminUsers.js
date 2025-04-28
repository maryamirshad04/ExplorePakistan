import React, { useState, useEffect } from 'react';
import './adminUsers.css';
import { Home, BarChart2,Shield, Users, Map, Gift, DollarSign, Briefcase, Search, Trash2, Edit, UserX, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.toLowerCase();

  // State for user list
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', status: 'Active', joinDate: '2025-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', status: 'Active', joinDate: '2025-02-03' },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', status: 'Inactive', joinDate: '2025-02-17' },
    { id: 4, name: 'Aisha Khan', email: 'aisha@example.com', status: 'Active', joinDate: '2025-03-05' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', status: 'Active', joinDate: '2025-03-22' }
  ]);

  // State for deletion form
  const [deleteForm, setDeleteForm] = useState({
    name: '',
    email: '',
    showConfirmation: false,
    user: null
  });

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filter users based on search term
  useEffect(() => {
    const results = users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  // Handle input changes for deletion form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteForm({
      ...deleteForm,
      [name]: value
    });
  };

  // Handle delete form submission
  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    
    // Find user by name and email
    const userToDelete = users.find(
      user => user.name.toLowerCase() === deleteForm.name.toLowerCase() && 
              user.email.toLowerCase() === deleteForm.email.toLowerCase()
    );
    
    if (userToDelete) {
      setDeleteForm({
        ...deleteForm,
        showConfirmation: true,
        user: userToDelete
      });
    } else {
      alert("No user found with that name and email combination.");
    }
  };

  // Confirm user deletion
  const confirmDelete = () => {
    if (deleteForm.user) {
      // Remove user from the list
      setUsers(users.filter(user => user.id !== deleteForm.user.id));
      
      // Reset the form
      setDeleteForm({
        name: '',
        email: '',
        showConfirmation: false,
        user: null
      });
      
      alert(`User "${deleteForm.user.name}" has been deleted.`);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteForm({
      ...deleteForm,
      showConfirmation: false,
      user: null
    });
  };

  // Handle direct user deletion from list
  const handleListDelete = (userId) => {
    const userToDelete = users.find(user => user.id === userId);
    
    if (window.confirm(`Are you sure you want to delete ${userToDelete.name}?`)) {
      setUsers(users.filter(user => user.id !== userId));
      alert(`User "${userToDelete.name}" has been deleted.`);
    }
  };

  // Toggle user status
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

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
          <button
              className={`sidebar-button ${currentPath === '/adminSafetyGuidelines' ? 'active' : ''}`}
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
                    <tr key={user.id} className={user.status === 'Inactive' ? 'inactive-user' : ''}>
                      <td>#{user.id.toString().padStart(3, '0')}</td>
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
                          onClick={() => toggleUserStatus(user.id)}
                          title={user.status === 'Active' ? "Deactivate User" : "Activate User"}
                        >
                          {user.status === 'Active' ? 
                            <UserX className="action-icon" /> : 
                            <UserCheck className="action-icon" />
                          }
                        </button>
                       
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleListDelete(user.id)}
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

          {/* Delete user form */}
          <div className="chart-container delete-user-container">
            <div className="chart-header">
              <h2 className="chart-title">Delete User</h2>
            </div>

            <div className="delete-form-wrapper">
              <form className="delete-form" onSubmit={handleDeleteSubmit}>
                <div className="form-group">
                  <label htmlFor="name">User Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Enter user's full name"
                    value={deleteForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Enter user's email"
                    value={deleteForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="delete-user-btn">
                  <Trash2 className="btn-icon" />
                  Find & Delete User
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Confirmation dialog */}
        {deleteForm.showConfirmation && (
          <div className="confirmation-dialog">
            <div className="dialog-content">
              <h3>Confirm User Deletion</h3>
              <p>Are you sure you want to permanently delete this user?</p>
              
              <div className="user-card">
                <div className="user-info">
                  <span className="user-name">{deleteForm.user.name}</span>
                  <span className="user-email">{deleteForm.user.email}</span>
                  <span className="user-id">ID: #{deleteForm.user.id.toString().padStart(3, '0')}</span>
                </div>
              </div>
              
              <div className="warning-message">
                <p><strong>Warning:</strong> This action cannot be undone.</p>
              </div>
              
              <div className="dialog-actions">
                <button className="cancel-btn" onClick={cancelDelete}>
                  Cancel
                </button>
                <button className="confirm-delete-btn" onClick={confirmDelete}>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;