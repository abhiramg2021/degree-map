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
  console.log(course.id);
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
  const [showPrereqs, setShowPrereqs] = useState(true);
  let prereqs = course.prerequisites;
  const selectRender = (ol) => {
    if (ol) {
      return <div className="selectHeader">One of the following options</div>;
    }
    return ol;
  };

  const renderPrereqs = (prs) => {
    if (Array.isArray(prs)) {
      let type = prs[0];
      prs = prs.slice(1);
      if (type === "or") {
        let orTaken = false;
        let render = [];
        let indRender = [];
        let arrRender = [];
        let selectR = false;

        prs.forEach((val) => {
          if (val.id !== undefined) {
            let [out, prTaken] = renderPrereqs(val);
            orTaken = prTaken || orTaken;

            prereqs.forEach((p) => {
              selectR = JSON.stringify(val) === JSON.stringify(p) || selectR;
            });
            
            
            val = out;
            indRender.push(val);
            indRender.push(<Or />);
          } else {
            let [out, prTaken, cond] = renderPrereqs(val);
            orTaken = prTaken || orTaken;
            let unDefId = true;
            if (cond) {
              out.forEach((o) => {
                arrRender.push(selectRender(true));
                arrRender.push(o);
              });
            } else {
              prereqs.forEach((p) => {
                selectR = JSON.stringify(val) === JSON.stringify(p) || selectR;
              });

              val.forEach((v) => {
                unDefId = v.id === undefined && unDefId;
              });
              
              console.log(val)

              arrRender.push(
                <div className="BulletedOption">
                  {unDefId ? false : <Bullet/>}
                  <li className="Option">{out}</li>
                </div>
              );
            }
          }
        });
        if (indRender.length !== 0) {
          indRender = (
            <div className="BulletedOption">
              <Bullet extra = "sub"/>
              <li className="Option">{indRender.slice(0, -1)}</li>
            </div>
          );
        }
        render = (
          <div className={""}>
            {selectR ? selectRender(true) : false}
            {indRender}
            {arrRender}
          </div>
        );

        return [render, orTaken];
      } else if (type === "and") {
        let andTaken;
        let [first, firstTaken] = renderPrereqs(prs[0]);
        let restPrs = prs.slice(1);
        let [rest, restTaken] = []
         if (restPrs.length > 1){
          restPrs = ["and", ...restPrs]
          rest = renderPrereqs(restPrs)
          rest = rest[0]
          restTaken = rest[1]
        } else {
        [rest, restTaken] = renderPrereqs(...restPrs);
        }

        andTaken = firstTaken && restTaken;
        let inArray = false;
        let render = [];
        if (rest.props.className.includes("req")) {
          render = (
            <div className="andTopLevel">
              {first} <And /> {rest}
            </div>
          );
        } else if (Array.isArray(prs[0]) && Array.isArray(...prs.slice(1))) {
          prs.unshift("and");
          prereqs.forEach((p) => {
            if (prs.length === p.length) {
              inArray = JSON.stringify(p) === JSON.stringify(prs) || inArray;
            }
          });

          render = [first, rest];
        } else {
          render = [
            <div className="andTopLevel">
              {first} <And />
            </div>,
            <ul>{rest}</ul>,
          ];
        }

        return [render, andTaken, inArray];
      }
    } else {
      return renderPrereq(prs);
    }
  };

  const renderPrereq = (pr) => {
    const taken = verifyReq(pr.id);
    let takenClass = taken ? "met" : "unmet";
    takenClass = "req " + takenClass;
    return [<div className={takenClass}>{pr.id}</div>, taken];
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
  let cond = true;

  const preReqRender = () => {
    if (showPrereqs === true) {
      if (prereqs.length === 0) {
        return <div className="Prereqs none">There are no prerequisites!</div>;
      }
      console.log("   Prereqs");
      console.log(prereqs);
      let render = renderPrereqs(prereqs);
      cond = render[1];
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
