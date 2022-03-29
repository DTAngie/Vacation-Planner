import React, { useState, useEffect } from "react";
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

export default function LoginForm(props){
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [invalidForm, setInvalidForm] = useState(true);

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();

    try {
      await userService.login(form);
      props.handleSignUpOrLogin();
      navigate('/dashboard');
    } catch(error){
      props.getError(error.message);
    }
  }


  useEffect(()=>{
    if(form.email && form.password){
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [form])

  return(
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" placeholder="email" onChange={handleChange} reequired />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" placeholder="password" onChange={handleChange} required />
      <button disabled={invalidForm} type="submit">Submit</button>
    </form>
  );
}