import React from "react";
import { Link } from 'react-router-dom';

export default function SegmentDetail({vacation, segment}){

  return(
    <div className='content VacationDetail'>
      <div className='card'>
        <h3>{vacation.name}</h3>
        <div className='left'>
          <p>{segment.city}</p>
        </div>
        <div className='right'>
          <p><Link to={`/vacations/${vacation.id}/segments/${segment.id}/activities/new`}  state={{vacation,segment}}>Add Activity</Link></p>
        </div>
        <div className='divider'></div>
        {/* <SegmentList segments={segments} vacation={vacation} /> */}
        {/* TODO: Display activities here */}
      </div>
    </div>
  );
}