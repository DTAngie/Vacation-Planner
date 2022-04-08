import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentDetail from "../../components/SegmentDetail/SegmentDetail";
import vacationService from '../../utils/vacationService';
import segmentService from '../../utils/segmentService';

export default function SegmentPage(){
  const location = useLocation();
  const params = useParams();
  const [segment, setSegment] = useState({});
  console.log(location)
  console.log(segment)

  useEffect(async ()=> {
      try {
        const data = await segmentService.getOne(params.id, params.segmentId);
        setSegment(data);
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