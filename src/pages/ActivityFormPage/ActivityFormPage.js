import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import segmentService from '../../utils/segmentService';
import activityService from '../../utils/activityService';

export default function ActivityFormPage(){
  const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  const [activity, setActivity] = useState({});
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();


  const activityForm = () => params.activityId ?
  <>
  {console.log(activity)}
        <h3>{activity?.segment.vacation.name} - {activity?.segment.city}</h3>
          <ActivityForm vacationId={activity?.segment.vacation.id} segmentId={activity?.segment.id} activity={activity}/>
      </>
    :
      <>
        <h3>{segment.vacation.name} - {segment.city}</h3>
        <ActivityForm vacationId={segment.vacation.id} segmentId={segment.id}/>
      </>
    ;

  useEffect(async ()=> {
    try {
      //TODO: create a different function that doesn't pull all activities, or maybe just one for editing. eg. getOneForEdit
      
      if(params.activityId){
        const data = await activityService.edit(params.id, params.segmentId, params.activityId);
        if (data === 'Access Denied'){
          navigate('/dashboard');
        } else {
          setActivity(data.activity);
        }
      } else {
        const data = await segmentService.getOneForEdit(params.id, params.segmentId);
        console.log(data)
        setSegment(data);
      }

      //START HERE THINK THROUGH LOGIC
      // set(data);
    } catch (err){
      console.log(err)
      // TODO: flash error to front page
    }
    // if(location.state?.vacation && location.state?.segment) {
    //   setVacation(location.state.vacation);
    //   setSegment(location.state.segment);
    // } else {
    //   setSegment(params.segmentId);
    //   set
    //   // navigate('/dashboard');
    // }

  },[])

  return (
    <div className='main grid'>
      <LeftNavigation />
      <div className='content'>
        {params.activityId ?
          <h2>Edit Activity</h2>
          :
          <h2>Add Activity</h2>
        }
        <div className="card">
        {Object.keys(segment).length > 0 || Object.keys(activity).length > 0 ?
          activityForm()
          :
          ""
        }
        </div>
      </div>
    </div>
  );
}