import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import activityService from "../../utils/activityService";
import ActivityList from "../ActivityList/ActivityList";

export default function SegmentDetail({segment}){
  // const [activities, setActivities] = useState([]);
  // TODO:move this logic up one level
  // useEffect(()=>{
  //   if(!activities){
  //     const data = await activityService.getActivities(segment.id);
  //     setActivities(data);
  //   } else {
  //     setActivities(activities);
  //   }
  // })
console.log('heeloo')
  console.log(segment)
  return(
    <div className='content VacationDetail'>
      <div className='card'>
        <h3>{segment.vacation.name}</h3>
        <div className='left'>
          <p>{segment.city}</p>
        </div>
        <div className='right'>
          <p><Link to={`/vacations/${segment.vacation.id}/segments/${segment.id}/activities/new`}>Add Activity</Link></p>
        </div>
        <div className='divider'></div>
        <ActivityList segment={segment}/>
        {/* TODO: Display activities here */}
      </div>
    </div>
  );
}