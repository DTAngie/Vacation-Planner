import React from "react";
import { Link } from "react-router-dom";
import './SegmentList.css';

export default function SegmentList({vacation}){
  return(
    <div className="SegmentList">
      {vacation.segments.map(segment => (
        <Link to={`/vacations/${vacation.id}/segments/${segment.id}`}
          key={segment.id}
        >
          <div className="segment" >
            <div className="segment-header">
              <p className="segment-number">{segment.number}</p>
              <p className="segment-first-line">{segment.city} {segment.state}</p>
              <p className="segment-second-line">{segment.country}</p>
            </div>
            <div className="segment-content">
              <p>Segment Cost: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(segment.segmentCost)}</p>
              <p>Click to View Activities</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}