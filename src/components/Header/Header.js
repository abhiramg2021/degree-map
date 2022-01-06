import React, { useState } from "react";
import "./Header.scss";
import { GoGear } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { Settings } from "./Settings/Settings";

export const Header = ({ color }) => {
  const [showSettings, setShowSettings] = useState(true);

  return (
    <div className={"Header " + color}>
      <span>Degree Map</span>
      <div className="icons">
        <FaGithub
          className="icon"
          onClick={() =>
            window.open(
              "https://github.com/abhiramg2021/degree-map/blob/master/README.md",
              "_blank"
            )
          }
        />
        <GoGear
          className="icon gear"
          onClick={() => setShowSettings(!showSettings)}
        />
      </div>

      {showSettings ? <Settings color={color} /> : false}
    </div>
  );
};
