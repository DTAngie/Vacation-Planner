import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationForm from "../../components/VacationForm/VacationForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import vacationService from "../../utils/vacationService";

export default function VacationPage({vacations, getVacation, removeVacation}){
  const [vacation, setVacation] = useState({});
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const vacationForm = () => Object.keys(vacation).length > 0 ?
      <>
        <VacationForm getError={getError} vacation={vacation} getVacation={getVacation} removeVacation={removeVacation} />
      </>
    :
      ""
    ;

  function getError(err){
    setError(err);
  }

  useEffect(async ()=> {
    try {
      if(params.id){
        const data = await vacationService.edit(params.id);
        setVacation(data.vacation);
      }
    } catch (err) {
      navigate('/dashboard');
    }
  },[]);

  return(
    <div className="main grid">
      <LeftNavigation vacations={vacations} />
      <div className="content">
        {error ? <ErrorMessage error={error} /> : ""}
        {params.id ?
          <h3>Edit Vacation</h3>
        :
          <h3>Add New Vacation</h3>
        }
        {params.id ?
          vacationForm()
        :
          <VacationForm getError={getError} getVacation={getVacation} />
        }
      </div>
    </div>
  );
}