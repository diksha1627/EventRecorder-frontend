import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Logout from './Logout'; // Import Logout component

const Dashboard = ({ token, setToken }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const decoded = jwtDecode(token);
      try {
        const response = await axios.get(`https://eventrecorder-backend.onrender.com/events/${decoded.username}`);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [token]);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the timestamp to a readable string
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Recorded Events</h2>
      <Logout setToken={setToken} style={styles.logoutButton} /> {/* Add Logout button */}
      <button style={styles.clearButton} onClick={() => window.location.href='/'}>Go back to Record</button>
      {events.length === 0 ? (
        <p style={styles.noEventsText}>No events recorded.</p>
      ) : (
        <ul style={styles.eventList}>
          {events.map((event, index) => (
            <li key={index} style={styles.eventItem}>
              <strong>Type:</strong> {event.type} <br />
              <strong>Time:</strong> {formatTime(event.time)} <br />
              {event.type === 'click' && (
                <>
                  <strong>Position:</strong> {event.x}, {event.y} <br />
                </>
              )}
              {event.type === 'key' && (
                <>
                  <strong>Key:</strong> {event.key} <br />
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4c3',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    color: '#4caf50',
    marginBottom: '20px',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    margin: '20px',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  clearButton: {
    width: '200px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2196f3',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  eventList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    textAlign: 'left',
    maxWidth: '600px',
  },
  eventItem: {
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  noEventsText: {
    fontSize: '18px',
    color: '#757575',
    fontStyle: 'italic',
  },
};

export default Dashboard;
