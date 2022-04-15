import React, { useState } from "react";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddFriendForm from "../../components/AddFriendForm/AddFriendForm";

export default function AddFriendPage({vacations}){
  const [error, setError] = useState('');
  
  function getError(err){
    setError(err);
  }
  return(
    <div className="main grid">
      <LeftNavigation vacations={vacations} />
      <div className="content">
        {error ? <ErrorMessage error={error} /> : ""}
        <AddFriendForm getError={getError} />
      </div>
    </div>
  );
}