import React from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';



export default function PageHeader({isLoggedIn, handleLogout}) {
  return (
    <div className='header'>
      <h1>Vacation Planner</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        { isLoggedIn ? 
        <li>
          <Link to="" onClick={handleLogout}>Log out</Link>
        </li>
        :
        <>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </>
        }
      </ul>
    </div>
  );
}