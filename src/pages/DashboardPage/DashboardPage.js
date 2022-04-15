import React from 'react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import VacationList from '../../components/VacationList/VacationList';
import './DashboardPage.css';

export default function DashboardPage({user, vacations}){
  console.log(user)
  return (
    <div className="main grid DashboardPage">
      <LeftNavigation vacations={vacations} />
      <div className='content VacationList'>
        <h2>My Vacations </h2>
        <h3>(Logged in as {user.profile?.username ? user.profile.username : user.email})</h3>
        {Object.keys(vacations).length > 0 ?
          <VacationList user={user} vacations={vacations}/>
        :
          <p>Add A Vacation to get started!</p>
        }
      </div>
    </div>
  );
}