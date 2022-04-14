import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import segmentService from '../../utils/segmentService';
import activityService from '../../utils/activityService';

export default function ActivityFormPage(){
  const [segment, setSegment] = useState({});
  const [activity, setActivity] = useState({});
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();


  const activityForm = () => params.activityId ?
      <>
        <h3>{activity?.segment.vacation.name} - {activity?.segment.city}</h3>
          <ActivityForm getError={getError} vacationId={activity?.segment.vacation.id} segmentId={activity?.segment.id} activity={activity}/>
      </>
    :
      <>
        <h3>{segment.vacation.name} - {segment.city}</h3>
        <ActivityForm getError={getError} vacationId={segment.vacation.id} segmentId={segment.id}/>
      </>
    ;

  function getError(err){
    setError(err);
  }

  useEffect(async ()=> {
    try {
       if(params.activityId){
        const data = await activityService.edit(params.id, params.segmentId, params.activityId);
        setActivity(data.activity);
      } else {
        const data = await segmentService.getOneForEdit(params.id, params.segmentId);
        setSegment(data);
      }
    } catch (err){
      navigate('/dashboard');
    }
 
  },[])

  return (
    <div className='main grid'>
      <LeftNavigation />
      <div className='content'>
        {error ? <ErrorMessage error={error} /> : ""}
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