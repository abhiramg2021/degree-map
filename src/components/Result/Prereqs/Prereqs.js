import React from "react";
import "./Prereqs.scss";
import "./SelectHeader.scss";
import { useSelector } from "react-redux";
import { Bullet } from "../Bullet/Bullet";
import { Or } from "../Operands/Or";
import { And } from "../Operands/And";
export const Prereqs = ({ course, showPrereqs, setTaken }) => {
  console.log(course.id)
  const inputText = useSelector((state) => state.inputText);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  let selectCount = 0;
  let prereqs = course.prerequisites;

  const selectRender = () => {
    selectCount++;
    let className = "selectHeader p blue ";
    className = selectCount > 1 ? className + "mult" : className;
    return (
      <div className={className}>
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
            orTaken = prOutput.taken || orTaken;
          } else {
            prOutput = renderPrereqs(pr);
            arrRender.push(prOutput.render);
            orTaken = prOutput.taken
            arr++;
          }
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
  let metReqs = [];
  const renderPrereq = (pr) => {
    const taken = verifyReq(pr.id);
    if (taken) {
      metReqs.push(pr.id);
    }

    return {
      render: <div className={"req c_" + taken}>{pr.id}</div>,
      taken: taken,
    };
  };

  const verifyReq = (pr) => {
    let currentSem = inputText.semId + 1;
    let cond = 0;
    semesters.slice(0, currentSem).forEach((s) => {
      s.courseIds.forEach((courseId) => {
        cond = pr === semesterCourses[courseId].code ? cond + 1 : cond;
      });
    });
    return cond === 0 ? false : true;
  };
  const preReqRender = () => {
    let render = [];
    if (prereqs.length === 0) {
      render = "There are no prerequisites!";
      setTaken(true);
    } else {
      render = renderPrereqs(prereqs);
      setTaken(render.taken);
      render = render.render;
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
    return render;
  };
  let output = preReqRender();
  let className = typeof output === typeof "" ? "none" : "multiple";

  return showPrereqs ? (
    <div className={"Prereqs " + className}>{output}</div>
  ) : (
    false
  );
};
