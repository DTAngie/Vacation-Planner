import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import vacationService from '../../utils/vacationService';
import './VacationList.css';

export default function VacationList({user}){
  const location = useLocation()
  const [vacations, setVacations] = useState([]);
  
  useEffect(()=> {
    async function getUserVacations(){
      try {
        const userVacations = await vacationService.getVacations(user.id);
        setVacations(userVacations);
      } catch (err) {
        console.log(err)
        // props.getError(err)
        // TODO: incorporate error handling here
      }
    }
    getUserVacations();
  },[]);

  return (
    <>
      {vacations ?
        vacations.map(vacation => (
          <div className='card' key={vacation.id}>
            <h3>{vacation.name}</h3>
            <div className='left'>
              <p>Budget: {vacation.budget}</p>
              <p>Passport Needed? {vacation.passportRequired ? 'Yes' : 'No'}</p>
            </div>
            <div className='right'>
              <p><Link to="/">View Segments</Link></p>
              <p><Link to={`/vacations/${vacation.id}`} state={{vacation}}>Add Segment</Link></p>
            </div>
          </div>
        ))
      :
        ""
      }
    </>
  );
}