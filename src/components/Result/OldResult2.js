import React from "react";
import "./Result.scss";
import "./Operands/Operands.scss";
import "./Info/Info.scss";
import "./Bullet/Bullets.scss"
import "./Prereqs.scss";
import "./Info/Linting/Linting.scss";
import "./SelectHeader.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { useState } from "react";
import { FaInfoCircle, FaShareAlt, FaPlus, FaSearch } from "react-icons/fa";
import { Bullet } from "./Bullet/Bullet";
import { Or } from "./Operands/Or";
import { And } from "./Operands/And";
export const Result = ({ course, courseId }) => {
  const inputText = useSelector((state) => state.inputText);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const size = "15px";
  const { addCourse } = bindActionCreators(actionCreators, dispatch);
  const handleInfoClick = () => {
    let parts = course.id.split(" ");
    parts = parts.join("%20");
    let url = "https://critique.gatech.edu/course?courseID=" + parts;
    window.open(url, "_blank");
  };
  let selectCount = 0;
  const [showPrereqs, setShowPrereqs] = useState(false);

  let prereqs = course.prerequisites;
  const selectRender = () => {
    selectCount++;
    return (
      <div className={selectCount > 1 ? "selectHeader mult" : "selectHeader"}>
        {selectCount > 1 ? <And /> : false}One of the following options
      </div>
    );
  };

  const renderPrereqs = (prs, orAnd) => {
    let render;
    let ind = 0;
    let arr = 0;
    if (Array.isArray(prs)) {
      let join = prs[0];
      prs = prs.slice(1);
      if (join === "or") {
        let orTaken = false;
        let indRender = [];
        let arrRender = [];

        prs.forEach((pr) => {
          let prOutput;
          if (pr.id !== undefined) {
            prOutput = renderPrereqs(pr);
            indRender.push(prOutput.render);
            indRender.push(<Or />);
            ind++;
          } else {
            prOutput = renderPrereqs(pr);
            arrRender.push(prOutput.render);
            arr++;
          }
          orTaken = prOutput.taken || orTaken;
        });
        indRender =
          ind > 0 ? (
            <div className="Ind group">
              <Bullet extra={orTaken} />
              {indRender.slice(0, -1)}
              {orAnd ? <And /> : false}
            </div>
          ) : null;
        // only render selectRender if we are in main array, create that logic here too.
        // need to unwrap the contents of arrRender array

        if (arr === 1) {
          arrRender = arrRender[0];
        }

        if (ind > 0 && arr > 0) {
          render = [indRender, arrRender];
        } else if (arr > 0) {
          if (arr > 1) {
            arrRender = [arrRender];
          }
          render = arrRender;
        } else if (ind > 0) {
          render = indRender;
        }

        if (ind === 0 && arr > 0) {
        } else {
          render = <div className="or_block">{render}</div>;
        }

        render = { render: render, taken: orTaken };
      } else {
        let andTaken;
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

        // rendering and blocks with more than 2 elements in the array vs one element in the array
        if (rest.length > 1) {
          rest.unshift("and");
        } else {
          rest.unshift("or");
        }
        let restOut = renderPrereqs(rest);
        render = mainVal ? (
          restOut.render
        ) : (
          <ul className="children">{restOut.render}</ul>
        );
        if (prs[0].length !== undefined) {
          orAnd = true && !mainVal;
        }
        let firstOut = renderPrereqs(prs[0], orAnd);
        let first = firstOut.render;
        // mainVal pt.2
        andTaken = restOut.taken && firstOut.taken;
        if (mainVal) {
          render = [first, render];
        } else {
          
          render = (
            <div className="Option parent">
              <div className="topLevel">
                {first.props !== undefined ? (
                  typeof first.props.children === typeof "" ? (
                    <Bullet extra={andTaken} />
                  ) : (
                    false
                  )
                ) : (
                  false
                )}
                {first}

                {orAnd ? false : <And />}
              </div>

              {render}
            </div>
          );
        }
        
        render = { render: render, taken: andTaken };
      }
    } else {
      render = renderPrereq(prs);
    }

    return render;
  };

  const renderPrereq = (pr) => {
    const taken = verifyReq(pr.id);
    return { render: <div className={"req c_" + taken}>{pr.id}</div>, taken: taken };
  };

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
  let cond = false
  const preReqRender = () => {
    let render = [];
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        render = "There are no prerequisites!";
      } else {
        render = renderPrereqs(prereqs);
        let taken = render.taken;
        render = render.render;
        cond = taken
        let out = [];

        if (render.length !== undefined) {
          render.forEach((o) => {
            out.push(selectRender());
            out.push(<div className="Options">{o}</div>);
          });
          render = out;
        } else {
          render = [selectRender(), <div className="Options">{render}</div>];
        }
      }
      let num = typeof render === typeof "" ? "none" : "multiple";
      return <div className={"Prereqs " + num}>{render}</div>;
    }
  };

    /// Linting Functions
  // Helper Function
  const lintOn = (m) => {
    lintClassModify(document.getElementsByClassName("c_false"), "req", "red");
    lintClassModify(document.getElementsByClassName("c_true"), "req", "green");
  };
  // Helper Function
  const lintOff = () => {
    lintClassModify(document.getElementsByClassName("c_false"), "red", "req");
    lintClassModify(document.getElementsByClassName("c_true"), "green", "req");
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
