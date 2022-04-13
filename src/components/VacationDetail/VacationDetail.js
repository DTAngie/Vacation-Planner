import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import segmentService from '../../utils/segmentService';
import SegmentList from '../SegmentList/SegmentList';
import './VacationDetail.css';

export default function VacationDetail({vacation}){
  
  return(
    <div className='content VacationDetail'>
      <div className='card'>
        <h3>{vacation.name}</h3>
        <div className='left'>
          <p>Budget: {vacation.budget}</p>
          <p>Passport Needed? {vacation.passportRequired ? 'Yes' : 'No'}</p>
        </div>
        <div className='right'>
          <p><Link to={`/vacations/${vacation.id}/segments/new`}>Add Segment</Link></p>
        </div>
        <div className='divider'></div>
        <SegmentList vacation={vacation} />
      </div>
    </div>
  );
}