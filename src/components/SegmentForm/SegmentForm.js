import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import segmentService from "../../utils/segmentService";
import './SegmentForm.css';

export default function SegmentForm({vacationId, segment, getError}) {
  const [form, setForm] =  useState({});
  const navigate = useNavigate();
  const [invalidForm, setInvalidForm] = useState(true);
  // TODO: add logic for invalid form

  async function handleSubmit(e){
    e.preventDefault();
    try {
      let data;
      if(segment) {
        data = await segmentService.update(vacationId, segment.id, form);
      } else {
        data = await segmentService.create(vacationId, form);
      }
      navigate(`/vacations/${vacationId}/segments/${data.segmentId}`);
    } catch (err) {
      if(err.message === "401") {
        console.log('theres an error')
        getError('Only vacation owners can modify vacation details.');
      } else if (err.message === '400'){
        getError('Could not update. Please try again.');
      }
    }
  }

  async function handleDelete(e){
    //TODO: set this up
  }

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  useEffect(()=> {
    if(form.number && form.city) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  },[form]);

  useEffect(()=> {
    if(segment) {
      setForm({
        number: segment.number,
        city: segment.city,
        state: segment.state,
        country: segment.country
      });
    }
  },[]);

  return (
    <div className='content SegmentForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="segment-number">Segment Number</label>
        <input type="number" name="number" id="segment-number" placeholder="e.g. 1 for the first stop" onChange={handleChange} defaultValue={segment?.number ? segment.number : ''} />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" placeholder="city" onChange={handleChange} defaultValue={segment?.city ? segment.city : ''} />
        <label htmlFor="state">State, if applicable</label>
        <input type="text" name="state" id="state" placeholder="state" onChange={handleChange} defaultValue={segment?.state ? segment.state : ''} />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" placeholder="country" onChange={handleChange} defaultValue={segment?.country ? segment.country : ''} />
        <div className="btn-container">
          <button className="submit-btn" disabled={invalidForm} type="submit">Submit</button>
          {segment ?
            <button className="danger delete-btn" onClick={handleDelete}>Delete Activity</button>
          :
            ""
          }

        </div>
      </form>
    </div>
  );
}