import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post('http://localhost:8081/login', {
        id: id, // Use 'username' instead of 'id'
        password: password,
      });

      if (response.status === 200) {
        // Request was successful
        nav('/HomePage');
      } else if (response.status === 401) {
        // Incorrect credentials
        setError(true);
      } else {
        // Other errors
        console.log('API request failed with status:', response.status);
      }
    } catch (error) {
      setError(true);
      console.log('An error occurred:', error);
    }
  };

  return (
    <div className="login_ctn"> {/* Apply the login_ctn class */}
      <div className="login_card"> {/* Apply the login_card class */}
        {error && <p style={{ color: "red" }}>Incorrect username or password</p>}
        <form className="login-form" onSubmit={onFinish}> {/* Apply the login-form class */}
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={id}
            onChange={(e) => setid(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-form-button" type="submit">Login</button> {/* Apply the login-form-button class */}
        </form>
      </div>
    </div>
  );
};

export default Login;
