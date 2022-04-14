import React from 'react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import VacationList from '../../components/VacationList/VacationList';
import './DashboardPage.css';

export default function DashboardPage({user}){
  return (
    <div className="main grid DashboardPage">
      <LeftNavigation />
      <div className='content VacationList'>
        <h2>My Vacations</h2>
        <VacationList user={user}/>
      </div>
    </div>
  );
}