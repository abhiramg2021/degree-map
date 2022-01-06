import React from "react";
import "./Course.scss";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";


export const Course = ({ course, semId, courseId, color }) => {
  //color component
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
            cond = verifyReq(p.courseId) || cond;
          });
        } else if (type === "and") {
          cond = true;
          prqs.forEach((p) => {
            cond = verifyReq(p.courseId) && cond;
          });
        }
      }

      return cond;
    } else {
        let cond = 0;
      let terms = ["Summer", "Fall", "Spring"];
      let currentYear = parseInt(semId.split(" ")[1]);
      let currName = semId.split(" ")[0];

      Object.keys(semesters).forEach((semId) => {
        let semYear = parseInt(semId.split(" ")[1]);
        let semName = semId.split(" ")[0];

        if (
          semYear < currentYear ||
          (semYear === currentYear &&
            terms.indexOf(currName) <= terms.indexOf(semName))
        ) {
          semesters[semId]["courseIds"].forEach((courseId) => {
            cond = prqs === courseId ? cond + 1 : cond;
          });
        }
      });
      return cond === 0 ? false : true;

    }
  };

  let valid = verifyReq(course.prereqs);



  return (
    <div
      className={valid ? "Course p black" : "Course p yellow missing"}
      onClick={() => deleteCourse(courseId, semId, course.credits)}
    >
      <div className={valid ? "bullet p " + color : "bullet p yellow"} />
      <span className="courseId">
        {courseId + " - " + course.credits} Credits
      </span>
    </div>
  );
};
