import React from 'react';
import { Link } from 'react-router-dom';
import './VacationList.css';

export default function VacationList({vacations}){
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