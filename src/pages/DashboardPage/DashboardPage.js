import React from 'react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import VacationList from '../../components/VacationList/VacationList';
import './DashboardPage.css';


export default function DashboardPage({user}){
  console.log('user is', user);
  return (
    <div className="main grid DashboardPage">
      <LeftNavigation />
      <VacationList />
      {user?.email} This is the Dashboard.
    </div>
  );
}