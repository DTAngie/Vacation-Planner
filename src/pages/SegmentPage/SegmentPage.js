import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentDetail from "../../components/SegmentDetail/SegmentDetail";
import vacationService from '../../utils/vacationService';
import segmentService from '../../utils/segmentService';

export default function SegmentPage(){
  const location = useLocation();
  const params = useParams();
  // const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  // const [activities, setActivities] = useState([]);
  console.log(location)
  console.log(segment)

  useEffect(async ()=> {
    // if(location.state?.vacation && location.state?.segment) {
    //   setVacation(location.state?.vacation);
    //   setSegment(location.state?.segment);
    //   // TODO: setActivity here instead of in component
    // } else {
      try {
        // const vacationData = await vacationService.getOne(params.id);
        const data = await segmentService.getOne(params.id, params.segmentId);
        setSegment(data);
        console.log(data)
        // setActivities(data.activities);
        // setVacation(data.vacation);
        // setSegment({
        //   id: data.id,
        //   city: data.city,
        //   state: data.state,
        //   country: data.country,
        //   number: data.number,
        //   segmentCost: data.segmentCost,
        // });
      } catch (err){
        console.log(err)
        // TODO: display this error
      }
    // }
  },[]);

  return (
    <div className="main grid SegmentPage">
     <LeftNavigation />
      {Object.keys(segment).length > 0 ?
        <SegmentDetail segment={segment}/>
        :
        ""  
      }
  </div>
  );
}