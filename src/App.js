import React, { useState } from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import FrontPage from './pages/FrontPage/FrontPage';
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';

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
        <PageHeader handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/dashboard" element={<DashboardPage user={user} />} />
        </Routes>
      
      
    </div>
  );
}

export default App;
