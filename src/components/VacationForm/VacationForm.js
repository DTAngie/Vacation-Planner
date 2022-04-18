import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vacationService from '../../utils/vacationService';
import './VacationForm.css';

export default function VacationForm ({vacation, getError, getVacation, removeVacation}){
  const [form, setForm] = useState({});
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

  async function handleSubmit(e) {
    e.preventDefault();
    if(new Date((form.startDate && form.endDate) && form.startDate) > new Date(form.endDate)) {
      return getError('Start Date cannot be after End Date');
    }
    if(!form.startDate && form.endDate) {
      return getError('Start Date must be provided if End Date is.')
    }
    try {
      let data;
      if(vacation) {
        data = await vacationService.update(vacation.id, form);
        getVacation(data.vacation)
      } else {
        data = await vacationService.create(form);
        getVacation(data.vacation, true);
      }
      navigate(`/vacations/${data.vacation.id}`);
    } catch (err) {
      if(err.message === "401") {
        getError('Only vacation owners can modify vacation details.');
      } else if (err.message === '400'){
        getError('Could not update. Please try again.');
      }
    }
  }

  async function handleDelete(e){
    try {
      await vacationService.delete(vacation.id);
      removeVacation(vacation.id);
      navigate('/dashboard');
    } catch(err) {
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
    if(vacation){
      setForm({
        name: vacation.name,
        budget: vacation.budget,
        passportRequired: vacation.passportRequired,
        startDate: vacation.startDate,
        endDate: vacation.endDate
      });
    } else {
      setForm({
        passportRequired: false
      });
    }
  },[vacation]);

  useEffect(()=> {
    if(form.name) {
      setInvalidForm(false)
    } else {
      setInvalidForm(true);
    }
  },[form]);

  return(
    <div className="VacationForm">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Vacation Nickname</label>
          <input type="text" name="name" id="name" placeholder="Vacation Nickname" onChange={handleChange} defaultValue={vacation?.name ? vacation.name : ''} />
          <label htmlFor="budget">Budget</label>
          <input type="number" name="budget" id="budget" step="0.01" min="0" placeholder="Budget" onChange={handleChange} defaultValue={vacation?.budget ? vacation.budget : ''} />
          <label htmlFor="start-date">Start Date</label>
          <input type="date" name="startDate" id="start-date" placeholder="Start Date" onChange={handleChange} defaultValue={vacation?.startDate ? vacation.startDate : ''} />
          <label htmlFor="end-date">End Date</label>
          <input type="date" name="endDate" id="end-date" placeholder="End Date" onChange={handleChange} defaultValue={vacation?.endDate ? vacation.endDate : ''} />
          <label htmlFor="passport">Passport Required?</label>
          <input type="checkbox" name="passportRequired" id="passport" onChange={handleToggle} defaultChecked={vacation?.passportRequired ? vacation.passportRequired : false} />
          <div className="btn-container">
            <button className="submit-btn" disabled={invalidForm} type="submit">Submit</button>
            <button className="cancel-btn" type="button" onClick={handleBack}>Cancel</button>
            {vacation ?
              <button className="danger delete-btn" type="button" onClick={handleDelete}>Delete Vacation</button>
            :
              ""
            }
          </div>
        </form>
      </div>
    </div>
  );
}