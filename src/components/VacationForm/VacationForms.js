import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';


export default function VacationForm (){
  const navigate = useNavigate();
  const [form, setForm] = useState({passportRequired: false}); //change this to reflect vacation instance, if passed in
  const [invalidForm, setInvalidForm] = useState(true);
  

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const vacation = await vacationService.create(form);
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
        <input type="text" name="name" placeholder="Vacation Nickname" onChange={handleChange} />
        <input type="number" name="budget" step="0.01" min="0" placeholder="Budget" onChange={handleChange} />
        <input type="checkbox" name="passportRequired" onChange={handleChange} />
        <button disabled={invalidForm} type="submit">Add New Vacation</button>
      </form>
    </div>
  );
}