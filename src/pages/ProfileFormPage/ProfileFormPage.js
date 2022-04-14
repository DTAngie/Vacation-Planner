import React, { useState } from "react";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function ProfileFormPage({user, updateProfile, vacations}){
  const [error, setError] = useState();

  function getError(err){
    setError(err);
  }

  return(
    <div className="main grid">
      <LeftNavigation vacations={vacations} />
      <div className="content">
        {error ? <ErrorMessage error={error} /> : ""}
        <h2>Edit Profile</h2>
        <div className="card">
          <ProfileForm user={user} getError={getError} updateProfile={updateProfile} />
        </div>
      </div>
    </div>
  );
}