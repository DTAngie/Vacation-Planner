import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddFriendForm from "../../components/AddFriendForm/AddFriendForm";

export default function AddFriendPage({vacations}){
  const [error, setError] = useState('');
  const [vacationId, setVacationId] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  
  function getError(err){
    setError(err);
  }
  useEffect(()=> {
    if(!location?.state?.vacationId){
      navigate('/dashboard');
    } else {
      setVacationId(location?.state?.vacationId);
    }
  },[location.state])

  return(
    <div className="main grid">
      <LeftNavigation vacations={vacations} />
      <div className="content">
        {error ? <ErrorMessage error={error} /> : ""}
        {vacationId ?
          <AddFriendForm vacationId={vacationId} getError={getError} />
        :
          ""
        }
      </div>
    </div>
  );
}