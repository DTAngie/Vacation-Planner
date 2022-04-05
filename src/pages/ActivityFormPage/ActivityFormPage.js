import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ActivityForm from '../../components/ActivityForm/ActivityForm';

export default function ActivityFormPage(){
  const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(async ()=> {
    if(location.state?.vacation && location.state?.segment) {
      setVacation(location.state.vacation);
    } else {
      navigate('/dashboard');
    }

  },[])

  return (
    <div className='main grid'>
      <LeftNavigation />
      <div className='content'>
        <h2>Add Activity</h2>
        <div className="card">
          <h3>{vacation.name}</h3>
            <ActivityForm vacationID={vacation.id} />
        </div>
      </div>
    </div>
  );
}