import React from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { useState } from "react";
import { FaInfoCircle, FaShareAlt, FaPlus } from "react-icons/fa";
export const Result = ({ course, courseId }) => {
  const inputText = useSelector((state) => state.inputText);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const size = "15px";
  const { addCourse } = bindActionCreators(actionCreators, dispatch);

  const handleInfoClick = () => {
    let parts = course.code.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseID=" + parts;
    window.open(url, "_blank");
  };
  const [showPrereqs, setShowPrereqs] = useState(false);

  const recursiveReq = (prs, orLevel, andLevel) => {
    let type = prs[0];
    let level = andLevel === undefined ? 1 : andLevel;
    level = "level_" + level;
    if (Array.isArray(prs)) {
      prs = prs.slice(1);
      if (type === "or") {
        return (
          <div>{prs.map((p) => recursiveReq(p, orLevel + 1, andLevel))}</div>
        );
      } else if (type === "and") {
        if (orLevel === 1 && andLevel === 0) {
          return prs
            .map((p) => recursiveReq(p, orLevel, andLevel + 1))
            .reduce((prev, curr) => [prev, selectRender, curr]);
        }

        return (
          <div>
            {recursiveReq(prs[0])}
            <ul>
              {prs.slice(1).map((p) => recursiveReq(p, orLevel, andLevel + 1))}
            </ul>
          </div>
        );
      }
    } else {
      let len = prs["id"].length * 12;
      level = "req " + level;
      return (
        <li className={level} style={{ width: `${len}px` }}>
          {prs["id"]}
        </li>
      );
    }
  };

  const verifyReq = (prqs) => {

    let cond = false
    if (Array.isArray(prqs)){
      let type = prqs[0]
      prqs = prqs.slice(1) 
      if (type === "or"){
        prqs.forEach(p =>{
          cond = verifyReq(p) ? true: cond
        })
        return cond
      } else if (type === "and"){
        prqs.forEach(p =>{
          cond = verifyReq(p) ? true : false
        })
        return cond
      }
    } else{
      return searchReq(prqs.id)
    }
    
  };

  const searchReq = (cr) => {
    let currentSem = inputText.semId + 1;
    let cond = 0;
    semesters.slice(0, currentSem).every((s) => {
         s.courseIds.every((courseId) => {
          cond = cr === semesterCourses[courseId].code ? cond + 1 : cond;
        })
    });
    return cond === 0 ? false: true
  };
  const selectRender = (
    <div className="select">Select one of the following</div>
  );
  const preReqRender = (prereqs) => {
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        return <div className="Prereqs none">There are no prerequisites!</div>;
      }
      console.log("End result: " + verifyReq(prereqs));
      return (
        <div className="Prereqs multiple">
          {selectRender}
          {recursiveReq(prereqs, 0, 0)}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="Result">
        <div className={showPrereqs ? "Head" : "Head closed"}>
          <div className="text">
            <span className="code">{course.code}</span>
            <span className="course">{course.name}</span>
            <span className="credit">{course.credits} Credits</span>
          </div>

          <div className="icons">
            <FaPlus
              className="icon"
              size={size}
              onClick={() => {
                addCourse(course, inputText["semId"], courseId);
              }}
            />
            <FaShareAlt
              className="icon vert"
              size={size}
              onClick={() => {
                setShowPrereqs(!showPrereqs);
              }}
            />

            <FaInfoCircle
              className="icon"
              size={size}
              onClick={handleInfoClick}
            />
          </div>
        </div>
        {preReqRender(course.prerequisites)}
      </div>
      <div className="Spacer"></div>
    </div>
  );
};
