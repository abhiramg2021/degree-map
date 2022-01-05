import React from "react";
import { BsTrashFill } from "react-icons/bs";
import "./Course.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";

export const Course = ({ course, semId, courseId }) => {
  const dispatch = useDispatch();
  const { deleteCourse } = bindActionCreators(actionCreators, dispatch);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);

  const verifyReq = (prqs) => {
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
            cond = verifyReq(p.id) || cond;
          });
        } else if (type === "and") {
          cond = true;
          prqs.forEach((p) => {
            cond = verifyReq(p.id) && cond;
          });
        }
      }

      return cond;
    } else {
      let cond = 0;
      semesters.slice(0, semId + 1).forEach((s) => {
        s.courseIds.forEach((courseId) => {
          cond = prqs === semesterCourses[courseId].code ? cond + 1 : cond;
        });
      });
      return cond === 0 ? false : true;
    }
  };

  let valid = verifyReq(course.prereqs);

  return (
    <div
      className={valid ? "Course p black" : "Course p yellow missing"}
      onClick={() => deleteCourse(courseId, semId, course.credits, course.code)}
    >
      <div className={valid ? "bullet p" : "bullet p yellow"} />
      <span className="code">
        {course.code + " - " + course.credits} Credits
      </span>
    </div>
  );
};
