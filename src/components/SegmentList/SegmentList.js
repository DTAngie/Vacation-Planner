import React from "react";
import { Link } from "react-router-dom";
import './SegmentList.css';

export default function SegmentList({segments, vacation}){
  return(
    <div className="SegmentList">
      {segments.map(segment => (
        <Link to={`/vacations/${vacation.id}/segments/${segment.id}`}
          key={segment.id}
          state={{vacation,segment}}
        >
          <div className="segment" >
            <div className="segment-header">
              <p className="segment-number">{segment.number}</p>
              <p className="segment-first-line">{segment.city} {segment.state}</p>
              <p className="segment-second-line">{segment.country}</p>
            </div>
            <div className="segment-content">
              <p>Number of activities</p>
              <p>Segment Cost</p>
              <p>View Activities</p>
              <p>add Activity</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}