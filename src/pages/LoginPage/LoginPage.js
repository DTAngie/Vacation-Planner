import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

export default function LoginPage(props){
  const [error, setError] = useState('');

  function getError(err){
    setError(err);
  }

  return (
    <div className="main LoginPage">
      <h2>Sign up</h2>
      {error ? <ErrorMessage error={error} /> : ""}
      <LoginForm getError={getError} handleSignUpOrLogin={props.handleSignUpOrLogin} />
    </div>
  );
}