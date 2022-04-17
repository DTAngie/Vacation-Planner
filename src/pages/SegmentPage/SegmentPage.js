import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentDetail from "../../components/SegmentDetail/SegmentDetail";
import segmentService from '../../utils/segmentService';

export default function SegmentPage({vacations}){
  const [segment, setSegment] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async ()=> {
      try {
        const data = await segmentService.getOne(params.id, params.segmentId);
        setSegment(data.segment);
        setIsOwner(data.isOwner)
      } catch (err){
        navigate('/dashboard');
      }
  },[]);

  return (
    <div className="main grid SegmentPage">
     <LeftNavigation vacations={vacations} />
     <div className="content">
      {Object.keys(segment).length > 0 ?
        <SegmentDetail segment={segment} isOwner={isOwner} />
        :
        ""  
      }
     </div>
  </div>
  );
}