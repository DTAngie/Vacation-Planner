import React, { useEffect, useState } from 'react';
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';


export default function SignupForm(props) {
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
    const formData = new FormData();

    for (let val in form) {
      formData.append(val, form[val])
    }
    
    try {
      await userService.signup(form)
      props.handleSignUpOrLogin();
      navigate('/dashboard');
    } catch(error) {
      props.getError(error.message);
    }

  }

  useEffect(()=>{
    if(form.email && form.password && (form.password === form.passwordConf)){
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [form]);

  return(
    <form className="SignupForm" onSubmit={handleSubmit} >
      <label htmlFor="email">Email Address</label>
      <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} required />
      <label htmlFor="passwordConf">Confirm password</label>
      <input type="password" name="passwordConf" id="passwordConf" placeholder="Confirm password" onChange={handleChange} required />
      <button disabled={invalidForm} type="submit">Sign up</button>
    </form>
  );
}