import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ActivityForm from '../../components/ActivityForm/ActivityForm';
import segmentService from '../../utils/segmentService';

export default function ActivityFormPage(){
  const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async ()=> {
    try {
      //TODO: create a different function that doesn't pull all activities, or maybe just one for editing. eg. getOneForEdit
      const data = await segmentService.getOne(params.id, params.segmentId)
      console.log(data)
      setSegment(data);
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
        <h2>Add Activity</h2>
        <div className="card">
        {Object.keys(segment).length > 0 ?
          <>
            <h3>{segment.vacation.name}</h3>
              <ActivityForm vacationId={segment.vacation.id} segmentId={segment.id}/>
          </>
          :
          ""
        }
        </div>
      </div>
    </div>
  );
}