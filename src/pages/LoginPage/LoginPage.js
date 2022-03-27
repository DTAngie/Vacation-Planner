import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

export default function LoginPage(props){
  const navigate = useNavigate();
  const [form, setForm] = useState({})
  const [error, setError] = useState('');

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
      setError(error.message);
    }
  }

  return (
    <div className="main">
      { error ? error.message : " "}
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} />
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}