import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import activityService from "../../utils/activityService";
import './ActivityForm.css';

export default function ActivityForm({vacationId, segmentId, activity, getError}){
  const [form, setForm] =  useState({});
  const navigate = useNavigate();
  const [invalidForm, setInvalidForm] = useState(true);

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

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
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
        ticketsPurchased: !!activity.ticketsPurchased
        // TODO: check database to be sure true/false are being saved to the databse, not null
      });
    } else {
      setForm({
        ticketsPurchased: false
      })
    }
  },[]);

  return (
    <div className='content ActivityForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" placeholder="date" onChange={handleChange} defaultValue={activity?.date ? activity.date : ''} required />
        <label htmlFor="time">Time</label>
        <input type="time" name="time" id="time" placeholder="time" onChange={handleChange} defaultValue={activity?.time ? activity.time : ''} />
        <label htmlFor="name">Activity</label>
        <input type="text" name="name" id="name" placeholder="activity" onChange={handleChange} defaultValue={activity?.name ? activity.name : ''} required />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" placeholder="address" onChange={handleChange} defaultValue={activity?.address ? activity.address : ''} />
        <label htmlFor="cost">Total Cost</label>
        <input type="number" min="0" name="cost" id="cost" placeholder="cost for all travellers" onChange={handleChange} defaultValue={activity?.cost ? activity.cost: ''} />
        <label htmlFor="ticketsPurchased">Tickets Purchased?</label>
        <input type="checkbox" name="ticketsPurchased" id="ticketsPurchased" onChange={handleChange} checked={activity?.ticketsPurchased} />
        <div className="btn-container">
          <button className="submit-btn" disabled={invalidForm} type="submit">Submit</button>
          {activity ?
            <button className="danger delete-btn" onClick={handleDelete}>Delete Activity</button>
          :
            ""
          }
        </div>
      </form>
    </div>
  );
}

