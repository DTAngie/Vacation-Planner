import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationDetail from "../../components/VacationDetail/VacationDetail";
import vacationService from "../../utils/vacationService";


export default function VacationPage({vacations}){
  const [vacation, setVacation] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(async ()=> {
    try {
      const data = await vacationService.getOne(params.id)
      setVacation(data.vacation);
    } catch (err) {
      navigate('/dashboard');
    }
  },[]);

  return(
    <div className="main grid DashboardPage">
      <LeftNavigation vacations={vacations} />
      <div className="content">
        {Object.keys(vacation).length > 0 ?
          <VacationDetail vacation={vacation} />
          :
          ""  
        }
      </div>
    </div>
  );
}