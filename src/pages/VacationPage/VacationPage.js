import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationDetail from "../../components/VacationDetail/VacationDetail";
import vacationService from "../../utils/vacationService";


export default function VacationPage(){
  const location = useLocation();
  const params = useParams();
  const [vacation, setVacation] = useState({});
  console.log(vacation)

  useEffect(async ()=> {
    try {
      const data = await vacationService.getOne(params.id)
      setVacation(data);
    } catch (err) {
      console.log(err)
      // TODO: display this error
    }
  },[]);

  return(
    <div className="main grid DashboardPage">
      <LeftNavigation />
      {Object.keys(vacation).length > 0 ?
        <VacationDetail vacation={vacation} />
        :
        ""  
      }
    </div>
  );
}