import React from 'react';
import { Link } from 'react-router-dom';
import SegmentList from '../SegmentList/SegmentList';
import './VacationDetail.css';

export default function VacationDetail({vacation}){
  return(
    <div className='VacationDetail'>
      <div className='card'>
        <h3>{vacation.name}</h3>
        <div className='left'>
          <p>{new Date(`${vacation.startDate}T00:00:00`).toDateString()} to {new Date(`${vacation.endDate}T00:00:00`).toDateString()}</p>
          <p>Budget: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(vacation.budget)}</p>
          <p>{vacation.passportRequired ? '' : 'No'}Passport Needed</p>
        </div>
        <div className='right'>
          <ul>
            <li className="back-link"><Link to={`/dashboard`}>Back to Dashboard</Link></li>
            <li><Link to={`/vacations/${vacation.id}/edit`}>Edit Vacation</Link></li>
            <li><Link to={`/vacations/${vacation.id}/segments/new`}>Add Segment</Link></li>
            <li><Link to={`/vacations/${vacation.id}/addFriend`} state={{vacationId: vacation.id}}>Share</Link></li>
          </ul>
        </div>
        <div className='vacationers'>
          <p>Vacationing with:</p>
          <ul>
            {/* TODO:for each vacationer, loop through and print an li */}
          </ul>
        </div>
        <div className='divider'></div>
        <SegmentList vacation={vacation} />
      </div>
    </div>
  );
}