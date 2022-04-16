import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';

export default function AddFriendForm({vacationId, getError}){
  const [form, setForm] = useState({});
  const [invalidForm, setInvalidForm] = useState(true);
  const navigate = useNavigate();

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      await vacationService.addFriend(vacationId, form);
      navigate(`/vacations/${vacationId}`);
    } catch(err) {
      if(err.message === "401") {
        getError('Not authorized to share this vacation.');
      } else if (err.message === '400'){
        getError('Could not find that friend.');
      }
    }
  }

  function handleBack(){
    navigate(-1);
  }

  useEffect(()=> {
    if(form.email) {
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  },[form]);

  return(
    <div className='ActivityForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Friend's email</label>
        <input type="email" name="email" id="email" onChange={handleChange} />
        <div className="btn-container">
          <button className="submit-btn" disabled={invalidForm} type="submit">Submit</button>
          <button className="cancel-btn" type="button" onClick={handleBack}>Cancel</button>
        </div>
      </form>
    </div>
  );
}