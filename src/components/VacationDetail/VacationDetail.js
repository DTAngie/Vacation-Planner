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
          <p>Budget: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(vacation.budget)}</p>
          <p>{vacation.passportRequired ? '' : 'No'}Passport Needed</p>
        </div>
        <div className='right'>
          <p><Link to={`/vacations/${vacation.id}/edit`}>Edit Vacation</Link></p>
          <p><Link to={`/vacations/${vacation.id}/segments/new`}>Add Segment</Link></p>
        </div>
        <div className='divider'></div>
        <SegmentList vacation={vacation} />
      </div>
    </div>
  );
}