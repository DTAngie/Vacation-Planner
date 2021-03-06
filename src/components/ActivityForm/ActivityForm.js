import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import activityService from "../../utils/activityService";
import './ActivityForm.css';

export default function ActivityForm({vacationId, segmentId, activity, getError}){
  const [form, setForm] =  useState({});
  const [invalidForm, setInvalidForm] = useState(true);
  const navigate = useNavigate();

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleToggle(e){
    setForm({
     ...form,
     [e.target.name]: e.target.checked
    });
   }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      if(activity) {
        await activityService.update(vacationId, segmentId, activity.id, form);
      } else {
        await activityService.create(vacationId, segmentId, form);
      }
      navigate(`/vacations/${vacationId}/segments/${segmentId}`);
    } catch(err) {
      if(err.message === "401") {
        getError('Only vacation owners can modify vacation details.');
      } else if (err.message === '400'){
        getError('Could not update. Please try again.');
      }
    }
  }

  async function handleDelete(e){
    try {
      await activityService.delete(vacationId, segmentId, activity.id);
      navigate(`/vacations/${vacationId}/segments/${segmentId}`);
    } catch (err){
      if(err.message === "401") {
        getError('Only vacation owners can modify vacation details.');
      } else if (err.message === '400'){
        getError('Could not delete. Please try again.');
      }
    }
  }

  function handleBack(){
    navigate(-1);
  }

  useEffect(()=> {
    if(form.date && form.name) {
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  },[form]);

  useEffect(()=> {
    if(activity) {
      setForm({
        date: activity.date,
        time: activity.time,
        name: activity.name,
        address: activity.address,
        cost: activity.cost,
        ticketsPurchased: activity.ticketsPurchased
      });
    } else {
      setForm({
        ticketsPurchased: false
      })
    }
  },[]);

  return (
    <div className='ActivityForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" placeholder="Date" onChange={handleChange} defaultValue={activity?.date ? activity.date : ''} required />
        <label htmlFor="time">Time</label>
        <input type="time" name="time" id="time" placeholder="Time" onChange={handleChange} defaultValue={activity?.time ? activity.time : ''} />
        <label htmlFor="name">Activity</label>
        <input type="text" name="name" id="name" placeholder="Activity" onChange={handleChange} defaultValue={activity?.name ? activity.name : ''} required />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" placeholder="Address" onChange={handleChange} defaultValue={activity?.address ? activity.address : ''} />
        <label htmlFor="cost">Total Cost</label>
        <input type="number" min="0" name="cost" id="cost" placeholder="Cost for all travellers" onChange={handleChange} defaultValue={activity?.cost ? activity.cost: ''} />
        <label htmlFor="ticketsPurchased">Tickets Purchased?</label>
        <input type="checkbox" name="ticketsPurchased" id="ticketsPurchased" onChange={handleToggle} defaultChecked={activity?.ticketsPurchased} />
        <div className="btn-container">
          <button className="submit-btn" disabled={invalidForm} type="submit">Submit</button>
          <button className="cancel-btn" type="button" onClick={handleBack}>Cancel</button>
          {activity ?
            <button className="danger delete-btn" type="button" onClick={handleDelete}>Delete Activity</button>
          :
            ""
          }
        </div>
      </form>
    </div>
  );
}

