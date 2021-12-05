import React from "react";
import { AddCourse } from "./AddCourse";
import { useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import { Course } from "./Course";
import "./Semester.scss";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../app/index";

export const Semester = ({ term, courseIds, semId, inputCourse }) => {
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const { deleteAllCourses } = bindActionCreators(actionCreators, dispatch);
  const headerItemSizes = "1.25em";
  const height = `${50 * (courseIds.length + 1)}px`;
  return (
    <div className="Semester">
      <div className="header">
        <div className="title">
          <span>{term}</span>
          <span className="credit">XX Credits</span>
        </div>
        <div className="icons">
          <FiRefreshCw
            size={headerItemSizes}
            className="icon rotate"
            onClick={() => {
              deleteAllCourses(semId, courseIds)
            }}
          />
        </div>
      </div>
      <div className="border" style={{ height: height }}></div>
      <div className="body">
        {courseIds.map((courseId) => (
          <Course
            className="Course"
            course={semesterCourses[courseId]}
            semId={semId}
            courseId={courseId}
          />
        ))}
        <AddCourse
          className="AddCourse"
          semId={semId}
          inputCourse={inputCourse}
        />
      </div>
    </div>
  );
};
