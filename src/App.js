import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EventRecorder from './components/EventRecorder';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth setToken={saveToken} />} />
        <Route path="/" element={token ? <EventRecorder token={token} setToken={setToken} /> : <Navigate to="/auth" />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;
