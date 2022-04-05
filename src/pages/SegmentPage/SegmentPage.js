import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import SegmentDetail from "../../components/SegmentDetail/SegmentDetail";

export default function SegmentPage(){
  const location = useLocation();
  const [vacation, setVacation] = useState({});
  const [segment, setSegment] = useState({});
  console.log(location)

  useEffect(()=> {
    setVacation(location.state?.vacation);
    setSegment(location.state?.segment);
  },[]);

  return (
    <div className="main grid SegmentPage">
     <LeftNavigation />
      {Object.keys(vacation).length > 0 ?
        <SegmentDetail vacation={vacation} segment={segment} />
        :
        ""  
      }
  </div>
  );
}