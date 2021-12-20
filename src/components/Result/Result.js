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
  const courseDirectory = useSelector((state) => state.courseDirectory);
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

  const recursiveReq = (prs, orLevel, andLevel, andCond) => {
    let type = prs[0];
    let level = andLevel === undefined ? 1 : andLevel;
    level = "level_" + level;
    if (Array.isArray(prs)) {
      prs = prs.slice(1);
      if (type === "or") {
        return (
          <div>
            {prs.map((p) => recursiveReq(p, orLevel + 1, andLevel, andCond))}
          </div>
        );
      } else if (type === "and") {
        if (orLevel === 1 && andLevel === 0) {
          return prs
            .map((p) => recursiveReq(p, orLevel, andLevel + 1, andCond))
            .reduce((prev, curr) => [prev, selectRender, curr]);
        }

        return (
          <div>
            {recursiveReq(prs[0], orLevel, andLevel, true)}
            <ul>
              {prs
                .slice(1)
                .map((p) => recursiveReq(p, orLevel, andLevel + 1, andCond))}
            </ul>
          </div>
        );
      }
    } else {
      let len = prs["id"].length * 12;
      level = "req " + level;
      return (
        <li className="item">
          <div className={level} style={{ width: `${len}px` }}>
            {prs["id"]}
          </div>
          {andCond ? <div className="and">and</div> : ""}
        </li>
      );
    }
  };

  const verifyReq = (prqs) => {
    let cond = false;
    if (Array.isArray(prqs)) {
      if (prqs.length === 0) {
        return true;
      }
      let type = prqs[0];
      prqs = prqs.slice(1);
      if (type === "or") {
        prqs.forEach((p) => {
          cond = verifyReq(p) ? true : cond;
        });
        return cond;
      } else if (type === "and") {
        prqs.forEach((p) => {
          cond = verifyReq(p) ? true : false;
        });
        return cond;
      }
    } else {
      console.log(prqs.id)
      if (prqs.id.indexOf("X") > -1) {
        let iter = xSearch(prqs.id);

        iter.forEach((i) => {
          cond = verifyReq(i) ? true : cond;
        });
        return cond;
      } else {
        return searchReq(prqs.id);
      }
    }
  };

  const xSearch = (crs) => {
    let dept = crs.substring(0, crs.indexOf(" "));
    let regexString = crs.replaceAll("X", "\\d");
    const regex = new RegExp(regexString);
    let depDirectory = courseDirectory[dept];
    return depDirectory.filter((d) => {
      if (regex.test(d.id)) {
        return true;
      }
    });
  };

  const searchReq = (cr) => {
    let currentSem = inputText.semId + 1;
    let cond = 0;
    semesters.slice(0, currentSem).forEach((s) => {
      s.courseIds.forEach((courseId) => {
        cond = cr === semesterCourses[courseId].code ? cond + 1 : cond;
      });
    });
    return cond === 0 ? false : true;
  };
  const selectRender = (
    <div className="select">One of the following options</div>
  );
  const preReqRender = (prereqs) => {
    xSearch("MATH 15X2")
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        return <div className="Prereqs none">There are no prerequisites!</div>;
      }
      return (
        <div className="Prereqs multiple">
          {selectRender}
          {recursiveReq(prereqs, 0, 0, false)}
        </div>
      );
    }
  };
  const cond = verifyReq(course.prerequisites);
  return (
    <div>
      <div className="Result">
        <div className={showPrereqs ? "Head" : "Head closed"}>
          <div className="text">
            <span className="code">{course.id}</span>
            <span className="course">{course.name}</span>
            <span className="credit">{course.credits} Credits</span>
          </div>

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
