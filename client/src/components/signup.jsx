// SignUp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const SignUp = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    username: ''
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });
  
      // Parse the JSON response
      const data = await response.json();
      
      console.log('User saved: ', data);
  
      if (response.ok) {
        // Reset form data after successful submission
        setFormData({
          Name: '',   // Ensure it's 'name' instead of 'Name'
          username: '',
          email: '',
          password: ''
        });
  
        // Show success message and call the onSuccess callback
        setSuccessMessage(true);
        onSuccess();
        navigate('/'); // Use navigate to redirect to home
      } else {
        console.log('Error saving user: ', data.message || 'Unknown error');
      }
    } catch (err) {
      console.log('Error saving user: ', err.message);
    }
  };
  
  
  return (
    <div className="main-container">
      <div className="form-container">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="name" name="Name" placeholder='Name' value={formData.Name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" minLength={3} id="username" name="username" placeholder='Username' value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="text" id="email" name="email" placeholder='Email ID' value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} required />
          </div>
          <div>Already Signup <a href="/signin">sign in</a></div>
          
          <input type="submit" value="Register" className='submit-btn' />
        </form>
        {successMessage && (
          <div className="popup">
            Successful registration!
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
