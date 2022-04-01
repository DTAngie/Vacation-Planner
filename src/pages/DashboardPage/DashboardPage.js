import React, { useState, useEffect  } from 'react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import VacationList from '../../components/VacationList/VacationList';
import './DashboardPage.css';
import vacationService from '../../utils/vacationService';
import { useLocation } from 'react-router-dom';


export default function DashboardPage({user}){
  return (
    <div className="main grid DashboardPage">
      <LeftNavigation />
      <VacationList user={user}/>
      {user?.email} This is the Dashboard.
    </div>
  );
}