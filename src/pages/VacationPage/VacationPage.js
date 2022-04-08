import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationDetail from "../../components/VacationDetail/VacationDetail";


export default function VacationPage(){
  const location = useLocation();
  const [vacation, setVacation] = useState({});
  console.log(location)

  useEffect(()=> {
    setVacation(location.state?.vacation);
    //TODO: add logic to get vacation from params if needed.
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