import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';


export default function VacationForm (){
  const navigate = useNavigate();
  const [form, setForm] = useState({passportRequired: false}); //TODO: change this to reflect vacation instance, if passed in
  const [invalidForm, setInvalidForm] = useState(true);
  

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await vacationService.create(form);
    navigate('/dashboard');

  }

  useEffect(()=> {
    if(form.name) {
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  },[form]);

  return(
    <div className="content VacationForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Vacation Nickname</label>
        <input type="text" name="name" id="name" placeholder="Vacation Nickname" onChange={handleChange} />
        <label htmlFor="budget">Budget</label>
        <input type="number" name="budget" id="budget" step="0.01" min="0" placeholder="Budget" onChange={handleChange} />
        <label htmlFor="passport">Passport Required?</label>
        <input type="checkbox" name="passportRequired" id="passport" onChange={handleChange} />
        <button disabled={invalidForm} type="submit">Add New Vacation</button>
      </form>
    </div>
  );
}