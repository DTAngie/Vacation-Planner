import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../utils/userService";
import './ProfileForm.css';

export default function ProfileForm({user, getError, updateProfile}) {
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
      const data = await userService.updateProfile(user.profile.id, form);
      updateProfile(data.profile);
      navigate('/dashboard');
    } catch(err) {
      navigate('/login');
    }
  }

  useEffect(()=> {
    if(form.username) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  },[form]);

  return(
    <div className="ProfileForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" placeholder="Username" onChange={handleChange} defaultValue={user?.username ? user.username : ''} />
        <button className="submit-btn" type="submit" disabled={invalidForm}>Submit</button>
      </form>
    </div>
  );
}