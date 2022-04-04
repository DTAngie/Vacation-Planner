import React from "react";
import { useLocation } from "react-router-dom";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationDetail from "../../components/VacationDetail/VacationDetail";


export default function VacationPage(){
  const location = useLocation();
  const vacation = location.state.vacation;

  return(
    <div className="main grid DashboardPage">
      <LeftNavigation />
      <VacationDetail vacation={vacation} />
    </div>
  );
}