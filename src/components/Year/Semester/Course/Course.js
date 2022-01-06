import React from "react";
import "./Course.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";
import { verifyReq } from "../../../utils";

export const Course = ({ course, semId, courseId, color }) => {
  //color component
  const dispatch = useDispatch();
  const { deleteCourse } = bindActionCreators(actionCreators, dispatch);
  const semesters = useSelector((state) => state.semesters);

  const verifyReqs = (prqs) => {
    if (Array.isArray(prqs)) {
      let cond;
      if (prqs.length === 0) {
        return true;
      } else {
        let type = prqs[0];
        prqs = prqs.slice(1);
        if (type === "or") {
          cond = false;
          prqs.forEach((p) => {
            cond = verifyReqs(p.id) || cond;
          });
        } else if (type === "and") {
          cond = true;
          prqs.forEach((p) => {
            cond = verifyReqs(p.id) && cond;
          });
        }
      }

      return cond;
    } else {
      return verifyReq(prqs, semId, semesters);
    }
  };
  console.log(course)
  let valid = verifyReqs(course.prereqs);

  return (
    <div
      className={valid ? "Course black" : "Course yellow missing"}
      onClick={() => deleteCourse(courseId, semId, course.credits)}
    >
      <div className={valid ? "bullet " + color : "bullet yellow"} />
      <span className="courseId">
        {courseId + " - " + course.credits} Credits
      </span>
    </div>
  );
};
