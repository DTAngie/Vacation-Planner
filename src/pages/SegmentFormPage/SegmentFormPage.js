import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentForm from "../../components/SegmentForm/SegmentForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import vacationService from "../../utils/vacationService";
import segmentService from "../../utils/segmentService";

export default function SegmentFormPage({vacations}){
  const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const segmentForm = () => params.segmentId ?
      <>
        <h3>{segment.vacation.name}</h3>
        <SegmentForm getError={getError} vacationId={segment.vacation.id} segment={segment} />
      </>
    :
      <>
        <h3>{vacation.name}</h3>
        <SegmentForm getError={getError} vacationId={vacation.id} />
      </>
    ;

  function getError(err){
    setError(err);
  }

  useEffect(async ()=>{
    try {
      if(params.segmentId){
       const data = await segmentService.edit(params.id, params.segmentId);
       setSegment(data.segment);
     } else {
       const data = await vacationService.getOneForEdit(params.id);
       setVacation(data.vacation);
     }
   } catch (err){
     navigate('/dashboard');
   }
  },[]);

  return (
    <div className='main grid'>
      <LeftNavigation vacations={vacations} />
      <div className='content'>
        {error ? <ErrorMessage error={error} /> : ""}
        {params.segmentId ?
          <h2>Edit Segment</h2>
        :
          <h2>Add Vacation Segment</h2>
        }
        <p className="guide">If you are travelling to multiple cities, you can split your vacation up into segments to assist with planning and budgeting.</p>
        <div className="card">
          {Object.keys(vacation).length > 0 || Object.keys(segment).length > 0 ?
            segmentForm()
          :
            ""
          }
        </div>
      </div>
    </div>
  );
}