import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../../redux/index";
import { FaInfoCircle, FaShareAlt, FaPlus, FaSearch } from "react-icons/fa";
import "./Linting/Linting.scss";
import "./Info.scss";

export const Info = ({
  course,
  courseId,
  showPrereqs,
  setShowPrereqs,
  taken,
  color,
}) => {
  const inputText = useSelector((state) => state.inputText);
  const size = ".9375rem";
  const dispatch = useDispatch();
  const { addCourse } = bindActionCreators(actionCreators, dispatch);

  const handleInfoClick = () => {
    let parts = course.courseId.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseId=" + parts;
    window.open(url, "_blank");
  };

  const lintOn = (m, c) => {
    lintClassModify(
      document.getElementsByClassName(m + "_false"),
      c,
      m + "_red"
    );
    lintClassModify(
      document.getElementsByClassName(m + "_true"),
      c,
      m + "_green"
    );
  };
  // Helper Function
  const lintOff = (m, c) => {
    lintClassModify(
      document.getElementsByClassName(m + "_false"),
      m + "_red",
      c
    );
    lintClassModify(
      document.getElementsByClassName(m + "_true"),
      m + "_green",
      c
    );
  };
  // Helper Function
  const lintClassModify = (list, o, n) => {
    if (list.length > 0) {
      for (const cl in list) {
        if (typeof list[cl].className == typeof "")
          list[cl].className = list[cl].className.replace(o, n);
      }
    }
  };

  const renderLint = () => {
    if (course.prerequisites.length > 0) {
      return (
        <div className="icons">
          <FaSearch
            className="icon"
            size={size}
            onMouseOver={() => lintOn("b", "Bullet")}
            onMouseLeave={() => lintOff("b", "Bullet")}
            onMouseDown={() => lintOn("c", "req")}
            onMouseUp={() => lintOff("c", "req")}
          />
        </div>
      );
    }
  };

  const extraInfoRender = () => {
    if (courseId.slice(-1) === "R") {
    } else {
      return (
        <FaInfoCircle className="icon" size={size} onClick={handleInfoClick} />
      );
    }
  };
  let className = "Info p " + color + " ";
  className = showPrereqs ? className : className + "closed";

  return (
    <div className={className}>
      <div className="text">
        <span className="courseId">{courseId}</span>
        <span className="name">{course.name}</span>
        <span className="credit">{course.credits} Credits</span>
      </div>
      <div className="iconList">
        <div className="icons">
          <FaPlus
            className={taken ? "icon" : "icon faded"}
            size={size}
            onClick={() => {
              if (taken) {
              
                addCourse(course, inputText["semId"], courseId, course.prerequisites);
              }
            }}
          />
          <FaShareAlt
            className="icon vert"
            size={size}
            onClick={() => {
              setShowPrereqs(!showPrereqs);
            }}
          />
          {extraInfoRender()}
        </div>
        {renderLint()}
      </div>
    </div>
  );
};
