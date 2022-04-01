import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import segmentService from "../../utils/segmentService";

export default function SegmentForm({vacationID}) {
  const [form, setForm] =  useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    const segment = await segmentService.create(form, vacationID);
    navigate('/dashboard', {state:{segment}});
    // TODO: change this redirect once page is built
  }

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className='content'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" placeholder="city" onChange={handleChange}/>
        <label htmlFor="state">State, if applicable</label>
        <input type="text" name="state" id="state" placeholder="state" onChange={handleChange} />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" placeholder="country" onChange={handleChange}/>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}