import React from 'react';
import { Link } from 'react-router-dom';
import './LeftNavigation.css';

export default function LeftNavigation(){
  return(
    <div className="LeftNavigation">
      <ul>
        <li><Link to='/vacations/new'>Add New Vacation</Link></li>
        <li>Edit Profile</li>
      </ul>
      <ul>
        {/* map through vaations */}
      </ul>
    </div>
  );
}