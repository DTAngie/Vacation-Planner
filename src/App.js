import React, { useState } from 'react';
import { Route, Routes, Navigate, Router, useLocation } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import FrontPage from './pages/FrontPage/FrontPage';
import SignupPage from './pages/SignupPage/SignupPage';
import userService from './utils/userService';
import './App.css';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import VacationFormPage from './pages/VacationFormPage/VacationFormPage';
import SegmentFormPage from './pages/SegmentFormPage/SegmentFormPage';
import VacationPage from './pages/VacationPage/VacationPage';
import SegmentPage from './pages/SegmentPage/SegmentPage';
import ActivityFormPage from './pages/ActivityFormPage/ActivityFormPage';


function App() {
  const [user, setUser] = useState(userService.getUser());
  const location = useLocation();
  // console.log('this is app location')
  // console.log(location)


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
          <Route path="/vacations/new" element={user ? <VacationFormPage /> : <Navigate to="/login" />} />
          <Route path="/vacations/:id/segments/new" element={user ? <SegmentFormPage /> : <Navigate to="/login" />} />
          <Route path="/vacations/:id" element={user ? <VacationPage /> : <Navigate to="/login" /> } />
          <Route path="/vacations/:id/segments/:segmentId" element={user ? <SegmentPage /> : <Navigate to="/login" /> } />
          <Route path="/vacations/:id/segments/:segmentId/activities/new" element={user ? <ActivityFormPage /> : <Navigate to="/login" /> } />
        </Routes>
      
      
    </div>
  );
}

export default App;
