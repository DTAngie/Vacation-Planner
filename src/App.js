import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import FrontPage from './pages/FrontPage/FrontPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import VacationFormPage from './pages/VacationFormPage/VacationFormPage';
import SegmentFormPage from './pages/SegmentFormPage/SegmentFormPage';
import VacationPage from './pages/VacationPage/VacationPage';
import SegmentPage from './pages/SegmentPage/SegmentPage';
import ActivityFormPage from './pages/ActivityFormPage/ActivityFormPage';
import ProfileFormPage from './pages/ProfileFormPage/ProfileFormPage';
import userService from './utils/userService';
import vacationService from './utils/vacationService';
import './App.css';


function App() {
  const [user, setUser] = useState(userService.getUser());
  const [vacations, setVacations] = useState([]);
  const navigate = useNavigate();
 
  function handleSignUpOrLogin(){
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }
  
  function updateProfile(profile) {
    user.profile = profile;
    setUser(user);
  }
  
  function getVacation(vacationData, isNewVacation=false){
    if(isNewVacation){
      setVacations([...vacations, vacationData]);
    } else {
      setVacations(vacations.map(vacation=>(
        vacation.id === vacationData.id ? vacationData : vacation
      )));
    }
  }

  function removeVacation(id){
    setVacations(vacations.filter(vacation=>(vacation.id !== id)));
  }

  
  useEffect(async ()=> {
    document.title = "Vacation Planner";
    try {
      const data = await vacationService.getVacations(user.id);
      setVacations(data.vacations);
    } catch (err) {
      navigate('/login');
    }
  },[]);

  return (
    <div className="App">
        <PageHeader isLoggedIn={user ? true : false } handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} vacations={vacations} /> : <Navigate to="/login" />} />
          <Route path="/profile/edit" element={user ? <ProfileFormPage user={user} updateProfile={updateProfile} vacations={vacations} /> : <Navigate to="/login" />} />
          <Route path="/vacations/new" element={user ? <VacationFormPage getVacation={getVacation} vacations={vacations} /> : <Navigate to="/login" />} />
          <Route path="/vacations/:id/edit" element={user ? <VacationFormPage getVacation={getVacation} removeVacation={removeVacation} vacations={vacations}/> : <Navigate to="/login" />} />
          <Route path="/vacations/:id/segments/new" element={user ? <SegmentFormPage vacations={vacations} /> : <Navigate to="/login" />} />
          <Route path="/vacations/:id/segments/:segmentId/edit" element={user ? <SegmentFormPage vacations={vacations} /> : <Navigate to="/login" />} />
          <Route path="/vacations/:id" element={user ? <VacationPage vacations={vacations} /> : <Navigate to="/login" /> } />
          <Route path="/vacations/:id/segments/:segmentId" element={user ? <SegmentPage vacations={vacations} /> : <Navigate to="/login" /> } />
          <Route path="/vacations/:id/segments/:segmentId/activities/new" element={user ? <ActivityFormPage vacations={vacations} /> : <Navigate to="/login" /> } />
          <Route path="/vacations/:id/segments/:segmentId/activities/:activityId/edit" element={user ? <ActivityFormPage vacations={vacations} /> : <Navigate to="/login" /> } />
        </Routes>
    </div>
  );
}

export default App;
