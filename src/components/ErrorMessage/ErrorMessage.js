import React from 'react';
import './ErrorMessage.css'

export default function ErrorMessage({error}){
  return(
    <div className='ErrorMessage'>
      <p>{error}</p>
    </div>
  );
}