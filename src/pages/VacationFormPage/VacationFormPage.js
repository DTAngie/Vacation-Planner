import React from "react";
import LeftNavigation from "../../components/LeftNavigation/LeftNavigation";
import VacationForm from "../../components/VacationForm/VacationForms";

export default function VacationPage (){
  return(
    <div className="main grid">
      <LeftNavigation />
      <VacationForm />
    </div>
  );
}