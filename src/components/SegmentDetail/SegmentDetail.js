import React from "react";
import { Link } from 'react-router-dom';
import ActivityList from "../ActivityList/ActivityList";
import './SegmentDetail.css';

export default function SegmentDetail({segment, isOwner}){
  return(
    <div className='SegmentDetail'>
      <div className='card'>
        <h3>{segment.vacation.name}</h3>
        <div className='left'>
          <ul>
            <li>{segment.city}</li>
          </ul>
        </div>
        <div className='right'>
          <ul>
            <li className="back-link"><Link to={`/vacations/${segment.vacation.id}`}>Back to Vacation</Link></li>
            {isOwner ?
              <>
                <li><Link to={`/vacations/${segment.vacation.id}/segments/${segment.id}/edit`}>Edit this Segment</Link></li>
                <li><Link to={`/vacations/${segment.vacation.id}/segments/${segment.id}/activities/new`}>Add Activity</Link></li>
              </>
            :
              ""
            }
          </ul>
        </div>
        <div className='divider'></div>
        <ActivityList segment={segment}/>
      </div>
    </div>
  );
}