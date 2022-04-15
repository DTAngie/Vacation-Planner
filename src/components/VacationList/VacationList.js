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
              <p>Budget: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(vacation.budget)}</p>
              <p>{vacation.passportRequired ? '' : 'No'} Passport Needed</p>
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