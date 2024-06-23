import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/auth');
  };

  return (
    <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
  );
};

export default Logout;

const styles = {
  logoutButton: {
    backgroundColor: '#f44336',
    color: '#ffffff',
    padding: '7px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s ease',
    margin:'10px'
  },
};
