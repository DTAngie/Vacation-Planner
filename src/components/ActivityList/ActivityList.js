import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityList.css';

export default function ActivityList({segment}){
  console.log(segment)

  function convertTime(timeStr){
    if(!timeStr) return '';
    let timeArray = timeStr.split(':');
    if(parseInt(timeArray[0]) <= 12) {
      return `${timeStr} AM`;
    }
    timeArray[0] = parseInt(timeArray[0]) - 12;
    return `${timeArray.join(':')} PM`;
  }
  return (
    <div className="ActivityList">
      {segment.activities.map(activity =>  (
        
        <Link to={`/vacations/${segment.vacation.id}/segments/${segment.id}/activities/${activity.id}/edit`}
          key={activity.id}
        >
          <div className="activity" >
            <div className="activity-header">
              <p>{new Date(activity.date).toDateString()}</p>
              <p id="activity-name">{activity.name}</p>
            </div>
            <div className="activity-content">
              <p>{convertTime(activity.time)}</p>
              <p>Address: {activity.address}</p>
              <p>Total Cost: {activity.cost}</p>
              <p>Tickets Purchased? {activity.ticketsPurchased ? 'yes' : 'no'}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}