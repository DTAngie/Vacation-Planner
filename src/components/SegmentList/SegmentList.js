import React from "react";

export default function SegmentList({segments}){
  console.log('segment list')
  console.log(segments)
  return(
    <>
      {segments.map(segment => (
        <div key={segment.id}>
          {segment.number}
          {segment.city} {segment.state}
          {segment.country}
        </div>
      ))}
    </>
  );
}