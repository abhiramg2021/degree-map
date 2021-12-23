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
  const [showPrereqs, setShowPrereqs] = useState(true);
  let prereqs = course.prerequisites;

// Helper Function
  const renderSelect = (al, cond) => {
    if (al === 1 || cond) {
      return <div className="selectHeader">One of the following options</div>;
    }
  };
  const renderReq = (prs, al, ol) => {
    if (Array.isArray(prs)) {
      let type = prs[0];
      prs = prs.slice(1);
      if (type === "or") {
        type = false;
        if (ol === 0) {
          let cond = true;
          let output = prs.map((pr) => {
            let out = renderReq(pr, al, ol + 1);
            if (pr.id !== undefined) {
              type = type || out[1];
              return out[0];
            } else {
              cond = pr.id !== undefined && cond;
              return out;
            }
          });
          return [
            <div className="Select Or">
              {renderSelect(al, cond)}
              {output}
            </div>,
            type,
          ];
        }
        return [
          <div className="Select Or">
            {renderSelect(al, cond)}
            {prs.map((pr) => {
              let out = renderReq(pr, al, ol + 1);

              if (Array.isArray(out)) {
                type = type || out[1];
                return out[0];
              }
              return out;
            })}
          </div>,
          type,
        ];
      } else {
        type = true;
        if (al === 0) {
          let all = prs.map((pr) => renderReq(pr, al + 1, ol));
          all.forEach((i) => {
            type = type && i[1];
          });
          return [all, type];
        }
        let zero = renderReq(prs[0], al);
        let others = prs.slice(1).map((pr) => renderReq(pr, al + 1, ol));
        type = zero[1] && others[1];

        return [
          <div className="Select And">
            {zero[0]}
            <ul>{others[0]}</ul>
          </div>,
          type,
        ];
      }
    } else {
      let pr = prs;
      let len = pr.id.length * 12;
      let type = verifyReq(pr.id);
      let clName = type ? "met" : "unmet";
      clName = "req " + clName;
      return [
        <div className={clName} style={{ width: `${len}px` }}>
          {prs["id"]}
        </div>,
        type,
      ];
    }
  };
// Helper Function
  const verifyReq = (cr) => {
    let currentSem = inputText.semId + 1;
    let cond = 0;
    semesters.slice(0, currentSem).forEach((s) => {
      s.courseIds.forEach((courseId) => {
        cond = cr === semesterCourses[courseId].code ? cond + 1 : cond;
      });
    });
    return cond === 0 ? false : true;
  };
  let cond = true;

  const preReqRender = () => {
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        return <div className="Prereqs none">There are no prerequisites!</div>;
      }
      console.log(prereqs);
      let render = renderReq(prereqs, 0, 0);
      cond = render[1];
      console.log(course.id + ": " + cond);
      return <div className="Prereqs multiple">{render[0]}</div>;
    }
  };
  /// Linting Functions
  // Helper Function
  const lintOn = () => {
    lintClassModify(document.getElementsByClassName("unmet"), "req", "red");
    lintClassModify(document.getElementsByClassName("met"), "req", "green");
  };
  // Helper Function
  const lintOff = () => {
    lintClassModify(document.getElementsByClassName("unmet"), "red", "req");
    lintClassModify(document.getElementsByClassName("met"), "green", "req");
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
    <div className="Result">
      <div className={showPrereqs ? "Info" : "Info closed"}>
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
      {preReqRender()}
    </div>
  );
};
