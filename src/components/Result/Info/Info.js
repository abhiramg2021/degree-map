import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../../redux/index";
import { FaInfoCircle, FaShareAlt, FaPlus, FaSearch } from "react-icons/fa";
import { lintOn, lintOff } from "./Linting/Linting.js";
import "./Info.scss";

export const Info = ({ course, courseId, cond }) => {
  const inputText = useSelector((state) => state.inputText);
  const size = "15px";
  const dispatch = useDispatch();
  const { addCourse } = bindActionCreators(actionCreators, dispatch);

  const handleInfoClick = () => {
    let parts = course.id.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseID=" + parts;
    window.open(url, "_blank");
  };

  const renderLint = () => {
    if (course.prerequisites.length > 0) {
      return (
        <div className="icons">
          <FaSearch
            className="icon"
            size={size}
            onMouseOver={() => {
              //   lintOn();
            }}
            onMouseLeave={() => {
              //   lintOff();
            }}
          />
        </div>
      );
    }
  };

  const extraInfoRender = () => {
    if (course.id.slice(-1) === "R") {
    } else {
      return (
        <FaInfoCircle className="icon" size={size} onClick={handleInfoClick} />
      );
    }
  };
  let className = "Info p blue "
  className = cond ? className : className + "closed"

  return (
    <div className={className}>
      <div className="text">
        <span className="code">{course.id}</span>
        <span className="course">{course.name}</span>
        <span className="credit">{course.credits} Credits</span>
      </div>
      <div className="iconList">
        <div className="icons">
          <FaPlus
            className={cond ? "icon" : "icon faded"}
            size={size}
            onClick={() => {
              if (cond) {
                addCourse(course, inputText["semId"], courseId);
              }
            }}
          />
          <FaShareAlt
            className="icon vert"
            size={size}
            onClick={() => {
              //   setShowPrereqs(!showPrereqs);
            }}
          />

          {extraInfoRender()}
        </div>
        {renderLint()}
      </div>
    </div>
  );
};
