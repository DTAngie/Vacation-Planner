import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';
import './VacationList.css';

export default function VacationList({user}){
  const [vacations, setVacations] = useState([]);
  const navigate = useNavigate();
  
  useEffect(async ()=> {
      try {
        const data = await vacationService.getVacations(user.id);
        setVacations(data.vacations);
      } catch (err) {
        navigate('/login');
      }
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
              <p><Link to={`/vacations/${vacation.id}`}>View More</Link></p>
            </div>
          </div>
        ))
      :
        ""
      }
    </>
  );
}