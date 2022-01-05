import React from "react";
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";

export const Settings = () => {
  const dispatch = useDispatch();
  const { updateSettingsYear } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const settings = useSelector((state) => state.settings);


  const handleStart = (event) =>{
      let year = parseInt(event.target.value)
      if (!isNaN(year) && year < settings.endYear && event.target.value.length === 4){
        updateSettingsYear(year, "start_year")
      }

}
  const handleEnd = (event) =>{
    let year = parseInt(event.target.value)
    if (!isNaN(year) && year > settings.startYear && event.target.value.length === 4){
        updateSettingsYear(year, "end_year")
    }
  }

  return (
    <div className="Settings">
      <div className="Setting">
        Start Year:{" "}
        <input
          className="yearInput"
          placeholder="XXXX"
          onChange={handleStart}
        ></input>
      </div>
      <div className="Setting">
        End Year: <input className="yearInput" placeholder="XXXX"onChange={handleEnd}></input>
      </div>
    </div>
  );
};
