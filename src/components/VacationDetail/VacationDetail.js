import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import segmentService from '../../utils/segmentService';
import SegmentList from '../SegmentList/SegmentList';
import './VacationDetail.css';

export default function VacationDetail({vacation}){
  const [segments, setSegments] = useState([]);
 

  //TODO: in useEffect do if statement to check for state. If no state, use vacationService to get vacation and associated segments. (in same function)
  useEffect(async ()=> {
    try {
      const data = await segmentService.getSegments(vacation.id);
      setSegments(data);
    } catch (err){ 
      console.log(err);
      // TODO: set error message
    }

  },[]);
  
  return(
    <div className='content VacationDetail'>
      <div className='card'>
        <h3>{vacation.name}</h3>
        <div className='left'>
          <p>Budget: {vacation.budget}</p>
          <p>Passport Needed? {vacation.passportRequired ? 'Yes' : 'No'}</p>
        </div>
        <div className='right'>
          <p><Link to={`/vacations/${vacation.id}/segments/new`}  state={{vacation}}>Add Segment</Link></p>
        </div>
        <div className='divider'></div>
        <SegmentList segments={segments} vacation={vacation} />
      </div>
    </div>
  );
}