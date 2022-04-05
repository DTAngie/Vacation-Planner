import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ActivityForm(){
  const [form, setForm] =  useState('');
  const navigate = useNavigate();
  const [invalidForm, setInvalidForm] = useState(true);

  async function handleSubmit(e){
    e.preventDefault();
    // const segment = await segmentService.create(form, vacationID);
    // navigate('/dashboard', {state:{segment}});
    // TODO: change this redirect once page is built
  }

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  useEffect(()=> {
    if(form.date && form.name) {
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  },[form]);

  return (
    <div className='content'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" placeholder="date" onChange={handleChange} required />
        <label htmlFor="time">Time</label>
        <input type="time" name="time" id="time" placeholder="time" onChange={handleChange} />
        <label htmlFor="name">Activity</label>
        <input type="text" name="name" id="name" placeholder="activity" onChange={handleChange} required />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" placeholder="address" onChange={handleChange} />
        <label htmlFor="cost">Total Cost</label>
        <input type="number" min="0" name="cost" id="cost" placeholder="cost for all travellers" onChange={handleChange} />
        <label htmlFor="tickets">Tickets Purchased?</label>
        <input type="checkbox" name="tickets" id="tickets" onChange={handleChange} />
        <button disabled={invalidForm} type="submit">Add New Activity</button>
      </form>
    </div>
  );
}

