import React, { useState } from 'react';
import userService from '../../utils/userService';

export default function FrontPage(){
  const [form, setForm] = useState({});
  const [error, setError] = useState('');

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    console.log('handlesubmit')

    for (let val in form) {
      formData.append(val, form[val])
    }
    
    try {
      await userService.signup(form)
    } catch {
    
    }

  }

  return(
    <div className='main'>
      <form onSubmit={handleSubmit} >
        {/* <input type="text" name="id" onChange={handleChange}/> */}
        <input type="text" name="email" onChange={handleChange}/>
        <input type="text" name="password" onChange={handleChange}/>
        <input type="text" name="profile" onChange={handleChange}/>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}