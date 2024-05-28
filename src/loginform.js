import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginform.css'

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === '123') {
      setIsLoggedIn(true); 
      navigate('/admin'); 
    } else if (username === 'user1' && password === '345') {
      setIsLoggedIn(true); 
      navigate('/user/1'); 
    } else if (username === 'user2' && password === '567') {
      setIsLoggedIn(true); 
      navigate('/user/2'); 
    } else if (username === 'user3' && password === '789') {
      setIsLoggedIn(true); 
      navigate('/user/3'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
