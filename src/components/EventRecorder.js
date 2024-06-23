import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Logout from './Logout'; // Import Logout component

const EventRecorder = ({ token, setToken }) => {
  const [recording, setRecording] = useState(false);
  const [events, setEvents] = useState([]);

  const handleRecord = () => {
    if (!recording) {
      document.addEventListener('click', recordClick);
      document.addEventListener('keydown', recordKey);
      window.addEventListener('blur', recordBlur);
      setEvents([]); // Clear events to start a new session
    } else {
      document.removeEventListener('click', recordClick);
      document.removeEventListener('keydown', recordKey);
      window.removeEventListener('blur', recordBlur);
      saveEvents(); // Save events when stopping recording
    }
    setRecording(!recording);
  };

  const recordEvent = (type, details = {}) => {
    setEvents((prevEvents) => [...prevEvents, { type, time: new Date().toISOString(), ...details }]);
  };

  const recordClick = (e) => {
    recordEvent('click', { x: e.clientX, y: e.clientY });
  };

  const recordKey = (e) => {
    recordEvent('key', { key: e.key });
  };

  const recordBlur = () => {
    recordEvent('blur');
  };

  const saveEvents = async () => {
    const decoded = jwtDecode(token);
    await axios.post('https://eventrecorder-backend.onrender.com/events', { username: decoded.username, events });
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      document.removeEventListener('click', recordClick);
      document.removeEventListener('keydown', recordKey);
      window.removeEventListener('blur', recordBlur);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Event Recorder</h2>
      <Logout setToken={setToken} style={styles.logoutButton} /> {/* Add Logout button */}
      <div style={styles.instructions}>
        <p>To start recording events, click the "Record" button. The following events will be recorded:</p>
        <ul>
          <li>Mouse clicks: Records the position (X, Y) of the click.</li>
          <li>Key presses: Records the key that was pressed.</li>
          <li>Tab switches: Records when the browser tab loses focus.</li>
        </ul>
        <p>Click the "Stop" button to stop recording and save the events.</p>
      </div>
      <button style={{ ...styles.button, ...(recording ? styles.recordingButton : {}) }} onClick={handleRecord}>
        {recording ? 'Stop' : 'Record'}
      </button>
      {recording && <p style={styles.recordingStatus}>Recording...</p>}
      <button style={styles.dashboardButton} onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</button>
      </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#e0f7fa',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    color: '#004d40',
    marginBottom: '20px',
  },
  instructions: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  button: {
    width: '200px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#004d40',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  recordingButton: {
    backgroundColor: '#d32f2f',
  },
  recordingStatus: {
    color: '#d32f2f',
    marginBottom: '20px',
  },
  dashboardButton: {
    width: '200px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#00796b',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
  },
  logoutButton: {
    alignSelf: 'flex-end',
    margin: '20px',
    backgroundColor: '#00796b',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default EventRecorder;
