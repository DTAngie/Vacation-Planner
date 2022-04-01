import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentForm from "../../components/SegmentForm/SegmentForm";
import vacationService from "../../utils/vacationService";

export default function AddSegmentPage(){
  const [vacation, setVacation] = useState({});
  const params = useParams();
  const location = useLocation();
  console.log(location.state);
  
  useEffect(()=>{
    async function getVacation(){
      try {
        const data = await vacationService.getOne(params.id);
        setVacation(data);
      }catch (err){
        console.log(err)
      }
    }
    if(location.state?.vacation) {
      setVacation(location.state.vacation);
    } else {
      getVacation();
    }
  },[vacation]);

  return (
    <div className='main grid'>
      <LeftNavigation />
      <div className='content'>
        <h2>Add Vacation Segment</h2>
        <p className="guide">If you are travelling to multiple cities, you can split your vacation up into segments to assist with planning and budgeting.</p>
        <div className="card">
          <h3>{vacation.name}</h3>
          <SegmentForm vacationID={vacation.id} />
        </div>
      </div>
    </div>
  );
}