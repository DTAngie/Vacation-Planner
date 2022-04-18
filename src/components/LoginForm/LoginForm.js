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
      if(error.message === "401") {
        props.getError('Username and/or password is incorrect.');
      } else if (error.message === '400'){
        props.getError('Something went wrong, please try again.');
      }
    }
  }


  useEffect(()=>{
    if(form.email && form.password){
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [form]);

  return(
    <form className="LoginForm" onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} required />
      <button disabled={invalidForm} type="submit">Submit</button>
    </form>
  );
}