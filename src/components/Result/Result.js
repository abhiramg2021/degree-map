import React from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { useState } from "react";
import { FaInfoCircle, FaShareAlt, FaPlus, FaSearch } from "react-icons/fa";
import { Bullet } from "./Bullet";
import { Or } from "./Or";
import { And } from "./And";
export const Result = ({ course, courseId }) => {
  const inputText = useSelector((state) => state.inputText);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const size = "15px";
  console.log(course.id);
  const { addCourse } = bindActionCreators(actionCreators, dispatch);
  const handleInfoClick = () => {
    let parts = course.id.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseID=" + parts;
    window.open(url, "_blank");
  };
  const [showPrereqs, setShowPrereqs] = useState(true);
  let prereqs = course.prerequisites;
  const selectRender = (ol) => {
    if (ol) {
      return <div className="selectHeader">One of the following options</div>;
    }
    return ol;
  };

  const print = (m, obj) => {
    console.log(m);
    console.log(obj);
  };
  const renderPrereqs = (prs) => {
    let render;
    let ind = 0;
    let arr = 0;
    if (Array.isArray(prs)) {
      let join = prs[0];
      prs = prs.slice(1);
      if (join === "or") {
        let indRender = [];
        let arrRender = [];

        prs.forEach((pr) => {
          if (pr.id !== undefined) {
            indRender.push(renderPrereqs(pr));
            indRender.push(<Or />);
            ind++;
          } else {
            arrRender.push(renderPrereqs(pr));
            arr++;
          }
        });
        indRender =
          ind > 0 ? (
            <div className="Ind group">{indRender.slice(0, -1)}</div>
          ) : null;
        // only render selectRender if we are in main array, create that logic here too.
        // need to unwrap the contents of arrRender array

        if (arr === 1) {
          arrRender = arrRender[0];
        }

        
        if (ind > 0 && arr > 0) {
          render = [indRender, arrRender];
        } else if (arr > 0) {
          if (arr > 1){
            arrRender = [arrRender]
          }
          render = arrRender;
        } else if (ind > 0) {
          render = indRender;
        }

        if (ind === 0 && arr > 0) {
        } else {
          render = <div className="or_block">{render}</div>;
        }

      } else {
        let rest = prs.slice(1);

        let org = ["and", ...prs];

        // choosing to render the array as a select block versus as a typical "and" block
        let mainVal = false;
        // only render when the length of the array is 2 to prevent errors with MATH 2550 type cases
        if (prereqs.length === 2) {
          prereqs.forEach((p) => {
            // selectHeader rendering only when all parts of "and" array are arrays themselves.
            let isArray = true;
            if (Array.isArray(p)) {
              p.slice(1).forEach((x) => {
                isArray = Array.isArray(x) && isArray;
              });
            }
            if (org.length === p.length) {
              mainVal =
                (JSON.stringify(org) === JSON.stringify(p) || mainVal) &&
                isArray;
            }
          });
        }

        // rendering and blocks with more than 2 elements in the array
        if (rest.length > 1) {
          rest.unshift("and");
          render = mainVal ? (
            renderPrereqs(rest)
          ) : (
            <ul className="children">{renderPrereqs(rest)}</ul>
          );
        } else {
          render = rest.map((pr) =>
            mainVal ? (
              renderPrereqs(pr)
            ) : (
              <ul className="children">{renderPrereqs(pr)}</ul>
            )
          );
        }

        // mainVal pt.2
        if (mainVal) {
          render = [renderPrereqs(prs[0]), render];
        } else {
          render = (
            <div className="Option parent">
              {renderPrereqs(prs[0])} <And />
              {render}
            </div>
          );
        }
      }
    } else {
      render = renderPrereq(prs);
    }

    return render;
  };

  const renderPrereq = (pr) => {
    return <div className="req">{pr.id}</div>;
  };

  const preReqRender = () => {
    let render = [];
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        render = "There are no prerequisites!";
      } else {
        render = renderPrereqs(prereqs);

        let out = [];

        if (render.length !== undefined) {
          render.forEach((o) => {
            out.push(selectRender(true));
            out.push(o);
          });
          render = out;
        } else {
          render = [selectRender(true), render];
        }
      }

      return render;
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
        <div className="icons">
          <FaPlus
            className="icon"
            size={size}
            onClick={() => {
              addCourse(course, inputText["semId"], courseId);
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
      <div className="Prereqs">{preReqRender()}</div>
    </div>
  );
};
