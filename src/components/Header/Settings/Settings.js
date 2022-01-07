import React from "react";
import "./Settings.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/index";


export const Settings = ({ color }) => {
  const dispatch = useDispatch();
  const { updateBounds, updateColor } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const years = useSelector((state) => state.years);
  const colors = useSelector((state) => state.colors);
  let startYear = parseInt(Object.keys(years)[0]);
  let endYear = parseInt(Object.keys(years)[Object.keys(years).length - 1]);

  //input boxes
  const handleYearChange = (event) => {
    let type = event.target.id.split("-")[0];
    let text = event.target.value;
    let year = parseInt(text);
    let cond = type === "start" ? year < endYear : year > startYear;
    let bound = type === "start" ? startYear : endYear;
    if (+text && cond && text.length === 4) {
      updateBounds(year, type, bound);
      event.target.className = "yearInput true";
    } else {
      event.target.className = "yearInput";
    }
  };
  // button settings
  const getNextColor = (current) => {
    let colors_dict = ["teal", "black", "blue", "yellow"];

    let current_index = colors_dict.indexOf(current);
    return colors_dict[
      current_index < colors_dict.length - 1 ? current_index + 1 : 0
    ];
  };
  const handleButtonClick = (event) => {
    let type = event.target.id.split("-")[0];
    let next = getNextColor(colors[type]);

    if ((event.target.id.split("-")[0] === "sems" && ["yellow", "black"].includes(next)) || (event.target.id.split("-")[0] === "search" && ["black"].includes(next))) {
      next = getNextColor(next);
    }

    updateColor(next, type);
  };
  return (
  <div className={"Settings black"}>
      <div className="Section">
        <div className="Section-header">Years</div>
        <div className="Section-content">
          <div className="Setting">
            Start:{" "}
            <input
              type="text"
              className="yearInput"
              id="start-year-input"
              placeholder={startYear}
              onChange={handleYearChange}
            ></input>
          </div>
          <div className="Setting">
            End:{" "}
            <input
              type="text"
              className="yearInput"
              id="end-year-input"
              placeholder={endYear + 1}
              onChange={handleYearChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="Section">
        <div className="Section-header">Color</div>
        <div className="Section-content">
          <button
            className={"color-setting " + colors.backer}
            id="backer-color-button"
            onClick={handleButtonClick}
          >
            Backer
          </button>
          <button
            className={"color-setting " + colors.sems}
            id="sems-color-button"
            onClick={handleButtonClick}
          >
            Semesters
          </button>
          <button
            className={"color-setting " + colors.search}
            id="search-color-button"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
