// App.jsx
import React, { useState } from 'react'; // Add import for useState
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';
import Home from './pages/Home'; // Import Home component
import SignUp from './components/signup'; // Import Registration component
import SignIn from './components/signin'; // Import SignIn component
import CodeEditor from './components/codeEditor';

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true); // Update state to reflect that the user is logged in
  };

  const handleRegistrationSuccess = () => {
    setIsLoggedIn(true); // Redirect to home on successful registration
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/registration" />} />
        <Route path="/registration" element={<SignUp onSuccess={handleRegistrationSuccess} />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/code"  element={<CodeEditor/>}/>
      </Routes>
    </Router>
  );
};

export default App;
