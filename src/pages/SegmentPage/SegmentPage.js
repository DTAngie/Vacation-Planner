import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentDetail from "../../components/SegmentDetail/SegmentDetail";
import segmentService from '../../utils/segmentService';

export default function SegmentPage(){
  const [segment, setSegment] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async ()=> {
      try {
        const data = await segmentService.getOne(params.id, params.segmentId);
        setSegment(data.segment);
      } catch (err){
        navigate('/dashboard');
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