import React from "react";
import { AddCourse } from "./AddCourse/AddCourse";
import { useSelector } from "react-redux";
import { FaUndoAlt } from "react-icons/fa";
import { Course } from "./Course/Course";
import "./Semester.scss";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/index";

export const Semester = ({ term, courseIds, semId, inputCourse, credits }) => {
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const { deleteAllCourses } = bindActionCreators(actionCreators, dispatch);
  const headerItemSizes = "1.25em";
  const height = `${15+(35 * (courseIds.length + 1))}px`;
  return (
    <div className="Semester p">
      <div className = "wrap">
      <div className="header">
        <div className="title">
          <span>{term}</span>
          <span className="credit">{credits} Credits</span>
        </div>
          <FaUndoAlt
            size={headerItemSizes}
            className="icon rotate"
            onClick={() => {
              deleteAllCourses(semId, courseIds)
            }}
          />
      </div>
      <div className="border" style={{ height: height }}></div>
      <div className="body">
        {courseIds.map((courseId) => {
          return (
            <Course
              className="Course"
              course={semesterCourses[courseId]}
              semId={semId}
              courseId={courseId}
            />
          )
        })}
        <AddCourse
          className="AddCourse"
          semId={semId}
          inputCourse={inputCourse}
          credits = {credits}
        />
      </div>
      </div>
    </div>
  );
};
