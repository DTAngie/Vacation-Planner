import React, { useEffect, useState } from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './SignupPage.css';


export default function SignupPage(props){
  const [error, setError] = useState('');

  function getError(err){
    setError(err);
  }

  return(
    <div className='main SignupPage'>
      <h2>Sign up</h2>
      {error ? <ErrorMessage error={error} /> : ""}
      <SignupForm getError={getError} handleSignUpOrLogin={props.handleSignUpOrLogin} />
    </div>
  );
}