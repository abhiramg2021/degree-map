import React from "react";
import { AddCourse } from "./AddCourse/AddCourse";
import { useSelector } from "react-redux";
import { FaUndoAlt } from "react-icons/fa";
import { Course } from "./Course/Course";
import "./Semester.scss";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../redux/index";

export const Semester = ({ term, ids, semId, inputCourse, credits, color }) => {
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const dispatch = useDispatch();
  const { deleteAllCourses } = bindActionCreators(actionCreators, dispatch);
  const headerItemSizes = "1.125em";
  return (
    <div className={"Semester p " + color}>
      <div className="header">
        <div className="title">
          <span>{term}</span>
          <span className="credit">{credits} Credits</span>
        </div>
        <div className="icon_holder">
          <FaUndoAlt
            size={headerItemSizes}
            className="icon rotate"
            onClick={() => {
              deleteAllCourses(semId, ids);
            }}
          />
        </div>
      </div>
      <div className="body">
        {ids.map((courseId) => {
          return (
            <Course
              className="Course"
              course={semesterCourses[courseId]}
              semId={semId}
              courseId={courseId}
              color = {color}
            />
          );
        })}
        <AddCourse
          className="AddCourse"
          semId={semId}
          inputCourse={inputCourse}
          credits={credits}
        />
      </div>
    </div>
  );
};
