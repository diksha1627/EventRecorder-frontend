import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('https://eventrecorder-backend.onrender.com/login', { username, password });
        setToken(response.data.token);
        navigate('/');
      } else {
        await axios.post('https://eventrecorder-backend.onrender.com/signup', { username, password });
        alert('User registered successfully');
        setIsLogin(true); // Switch to login view after signup
      }
    } catch (error) {
      alert('Error during authentication');
      console.error('Auth Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          style={styles.input} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          style={styles.input} 
        />
        <button type="submit" style={styles.button}>{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={styles.switchButton}>
        {isLogin ? 'Switch to Signup' : 'Switch to Login'}
      </button>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '250px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #004d40',
  },
  button: {
    width: '250px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#004d40',
    color: 'white',
    cursor: 'pointer',
  },
  switchButton: {
    marginTop: '20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#004d40',
    cursor: 'pointer',
    textDecoration: 'underline',
  }
};

export default Auth;
