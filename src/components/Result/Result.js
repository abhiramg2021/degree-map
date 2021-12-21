import React from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { useState } from "react";
import { FaInfoCircle, FaShareAlt, FaPlus, FaSearch } from "react-icons/fa";
export const Result = ({ course, courseId }) => {
  const inputText = useSelector((state) => state.inputText);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const courseDirectory = useSelector((state) => state.courseDirectory);
  const metReqs = [];
  const dispatch = useDispatch();
  const size = "15px";
  const { addCourse } = bindActionCreators(actionCreators, dispatch);
  const handleInfoClick = () => {
    let parts = course.id.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseID=" + parts;
    window.open(url, "_blank");
  };
  const [showPrereqs, setShowPrereqs] = useState(false);
  const recursiveReq = (prs, orLevel, andLevel, andCond) => {
    let cond = false;
    let type = prs[0];
    let level = andLevel === undefined ? 1 : andLevel;
    level = "level_" + level;
    if (Array.isArray(prs)) {
      prs = prs.slice(1);
      if (type === "or") {
        return (
          <div>
            {prs.map((p) => {
              let out = recursiveReq(p, orLevel, andLevel + 1, andCond);
              cond = p.verify ? true : cond;
              prs.verify = cond;
              return out;
            })}
          </div>
        );
      } else if (type === "and") {
        if (orLevel === 1 && andLevel === 0) {
          return prs
            .map((p) => {
              let out = recursiveReq(p, orLevel, andLevel + 1, andCond);
              cond = p.verify ? true : cond;
              prs.verify = cond;
              return out;
            })
            .reduce((prev, curr) => [prev, selectRender, curr]);
        }

        return (
          <div>
            {recursiveReq(prs[0], orLevel, andLevel, true)}
            <ul>
              {prs.slice(1).map((p) => {
                let out = recursiveReq(p, orLevel, andLevel + 1, andCond);
                cond = p.verify ? true : false;
                prs.verify = cond;
                return out;
              })}
            </ul>
          </div>
        );
      }
    } else {
      let len = prs["id"].length * 12;
      level = "req " + level;
      prs.verify = verifyReq(prs);
      let mets = prs.type ? "met" : "unmet";
      level = level + " " + mets;

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
          let orCond = verifyReq(p);
          cond = orCond ? true : cond;
          if (p.id !== undefined && orCond) {
            metReqs.push(p.id);
          }
        });
        return cond;
      } else if (type === "and") {
        prqs.forEach((p) => {
          cond = verifyReq(p) ? true : false;
        });
        if (cond) {
          metReqs.push(prqs);
        }
        return cond;
      }
    } else {
      if (prqs.id.indexOf("X") > -1) {
        let iter = xSearch(prqs.id);

        iter.forEach((i) => {
          cond = verifyReq(i) ? true : cond;
        });
        prqs.type = cond;
        return cond;
      } else {
        cond = searchReq(prqs.id);
        prqs.type = cond;
        return cond;
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
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        return <div className="Prereqs none">There are no prerequisites!</div>;
      }
      return (
        <div className="Prereqs multiple">
          {selectRender}
          {recursiveReq(prereqs, 0, 0, false)}
          {console.log(course.prerequisites)}
        </div>
      );
    }
  };

  const cond = verifyReq(course.prerequisites);

  /// Linting Functions
  const lintOn = () => {
    classModify(document.getElementsByClassName("unmet"), "req", "red");
    classModify(document.getElementsByClassName("met"), "req", "green");
  };
  const lintOff = () => {
    classModify(document.getElementsByClassName("unmet"), "red", "req");
    classModify(document.getElementsByClassName("met"), "green", "req");
  };

  const classModify = (list, o, n) => {
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
            onMouseOver={() => {
              lintOn();
            }}
            onMouseLeave={() => {
              lintOff();
            }}
          />
        </div>
      );
    }
  };
  return (
    <div>
      <div className="Result">
        <div className={showPrereqs ? "Head" : "Head closed"}>
          <div className="text">
            <span className="code">{course.id}</span>
            <span className="course">{course.name}</span>
            <span className="credit">{course.credits} Credits</span>
          </div>
          <div className="iconList">
            {renderLint()}
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
                className="icon vert prqs"
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
        </div>
        {preReqRender(course.prerequisites)}
      </div>
      <div className="Spacer"></div>
    </div>
  );
};
