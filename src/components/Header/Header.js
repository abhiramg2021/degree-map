import React, { useState } from "react";
import "./Header.scss";
import {GoGear} from "react-icons/go";
import { Settings } from "../Settings/Settings";

export const Header = ({color}) => {
  const [showSettings, setShowSettings] = useState(false)
  
  return <div className={"Header p " + color}>
    <span>Degree Map</span>
    <GoGear className = "icon" onClick = {() => setShowSettings(!showSettings)}/>
    {showSettings ? <Settings color = {color}/> : false}
  </div>;
};
