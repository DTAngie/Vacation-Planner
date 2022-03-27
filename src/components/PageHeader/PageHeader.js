import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';



export default function PageHeader(props) {
  return (
    <div className='header'>
      <h1>Vacation Planner</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="" onClick={props.handleLogout}>Log out</Link>
        </li>
      </ul>
    </div>
  );
}