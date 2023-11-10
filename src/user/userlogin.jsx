import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import './userlogin.css';
import axios from 'axios';

function Userlogin()  { // Capitalize the function name to follow React naming conventions
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
  
    const [errors, setErrors] = useState({
      email: '',
      password: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  
      setErrors({
        ...errors,
        [name]: '',
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const newErrors = {};
  
      if (!formData.email || !formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
  
      if (!formData.password || !formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length !== 8) {
        newErrors.password = 'Password must be exactly 8 characters';
      }
  
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      setFormData({
        email: '',
        password: '',
      });
      axios.post('http://localhost:8081/api/get', formData)
        .then((res) => {
          console.log(res)
          navigate('/TermsndConditions');
        });
    };
  
    const isSubmitDisabled = !formData.email || !formData.password;
  
    return (
      <div className='main-login'>
        <div>
          <h1><center>GoRent</center></h1>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className="error">{errors.email}</span>
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="error">{errors.password}</span>
            </div>
            <button type="submit" disabled={isSubmitDisabled}>
              Login
            </button>
          </form>
          <Link to="/usersignin">New User</Link>
        </div>
      </div>
    );
  }

export default Userlogin;
