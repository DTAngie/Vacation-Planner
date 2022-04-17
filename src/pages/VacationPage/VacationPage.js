import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationDetail from "../../components/VacationDetail/VacationDetail";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import vacationService from "../../utils/vacationService";


export default function VacationPage({vacations, user}){
  const [vacation, setVacation] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();

  function getError(err){
    setError(err)
  }

  useEffect(async ()=> {
    try {
      const data = await vacationService.getOne(params.id)
      setVacation(data.vacation);
      setIsOwner(data.isOwner);
    } catch (err) {
      navigate('/dashboard');
    }
  },[params.id]);

  return(
    <div className="main grid DashboardPage">
      <LeftNavigation vacations={vacations} />
      <div className="content">
      {error ? <ErrorMessage error={error} /> : ""}
        {Object.keys(vacation).length > 0 ?
          <VacationDetail vacation={vacation} isOwner={isOwner} user={user} getError={getError} />
          :
          ""  
        }
      </div>
    </div>
  );
}