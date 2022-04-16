import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';
import SegmentList from '../SegmentList/SegmentList';
import './VacationDetail.css';

export default function VacationDetail({vacation, isOwner, user, getError}){
  const [vacationers, setVacationers] = useState();
  const navigate = useNavigate();

  async function handleRemoveFriend(e){
    try {
      await vacationService.removeFriend(vacation.id, e.target.id);
      setVacationers(vacationers.filter(friend=>(
        friend.id !== e.target.id
      )));
    } catch(err) {
      if(err.message === "401") {
        getError('Only vacation owners can modify vacation details.');
      } else if (err.message === '400'){
        getError('Could not update. Please try again.');
      }
    }
  }

  async function handleRemoveVacation(e){
    try {
      await vacationService.delete(vacation.id);
      navigate('/dashboard');
    } catch(err) {
      if(err.message === "401") {
        getError('Not authorized to delete this vacation.');
      } else if (err.message === '400'){
        getError('Could not update. Please try again.');
      }
    }
  }

  useEffect(()=>{
    setVacationers(vacation.profiles);
  }, []);

  return(
    <div className='VacationDetail'>
      <div className='card'>
        <h3>{vacation.name}</h3>
        <div className='left'>
          <ul>
            <li>{new Date(`${vacation.startDate}T00:00:00`).toDateString()} to {new Date(`${vacation.endDate}T00:00:00`).toDateString()}</li>
            <li>Budget: {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(vacation.budget)}</li>
            <li>{vacation.passportRequired ? '' : 'No'}Passport Needed</li>
          </ul>
        </div>
        <div className='right'>
          <ul>
            <li className="back-link"><Link to={`/dashboard`}>Back to Dashboard</Link></li>
            {isOwner ?
              <>
                <li><Link to={`/vacations/${vacation.id}/edit`}>Edit Vacation</Link></li>
                <li><Link to={`/vacations/${vacation.id}/segments/new`}>Add Segment</Link></li>
              </>
            :
              <li><Link onClick={handleRemoveVacation} to="">Remove Vacation</Link></li>
            }
            <li><Link to={`/vacations/${vacation.id}/addFriend`} state={{vacationId: vacation.id}}>Share</Link></li>
          </ul>
        </div>
        <div className='vacationers'>
          <p>Vacationing with:</p>
          <ul>
            { vacationers ? vacationers.map(friend => {
              if(friend.id !== user.profile.id) {
                return (
                  <li key={friend.id}>
                    <p>{friend.username}</p>
                    {isOwner ? <p className="remove" id={friend.id} onClick={handleRemoveFriend}>Remove</p> : ""}
                  </li>
                );
              } else {
                return "";
              }
            })
            :
            ""
            }
          </ul>
        </div>
        <div className='divider'></div>
        <SegmentList vacation={vacation} />
      </div>
    </div>
  );
}