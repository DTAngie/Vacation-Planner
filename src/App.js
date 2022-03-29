import React, { useState } from 'react';
import { Route, Routes, Navigate, Router } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import FrontPage from './pages/FrontPage/FrontPage';
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  const [user, setUser] = useState(userService.getUser());


  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  return (
    <div className="App">
        <PageHeader isLoggedIn={user ? true : false } handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} />        
        </Routes>
      
      
    </div>
  );
}

export default App;
