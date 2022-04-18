import React from 'react';
import { Link } from 'react-router-dom';
import './LeftNavigation.css';

export default function LeftNavigation({vacations}){

  return(
    <div className="LeftNavigation">
      <ul>
        <li><Link to='/profile/edit'>Edit Profile</Link></li>
        <li><Link to='/vacations/new'>Add New Vacation</Link></li>
      </ul>
      <ul id="vacations">
        {Object.keys(vacations).length > 0 ? 
          vacations.map(vacation => (
            <li key={vacation.id}>
              <Link to={`/vacations/${vacation.id}`}>{vacation.name}</Link>
            </li>
          ))
        :
          ""
        }
      </ul>
    </div>
  );
}