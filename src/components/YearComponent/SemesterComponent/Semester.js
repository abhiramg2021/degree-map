import React from "react";
import { AddCourse } from "./AddCourse";
import { useSelector } from "react-redux";
// import { AiFillCaretDown } from "react-icons/ai";
import { BsFillPaletteFill } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { Course } from "./Course";

export const Semester = ({ term,courseIds, semId, inputCourse}) => {
  const semesterCourses = useSelector(state => state.semesterCourses)
  const headerItemSizes = "1.25em";
  return (
    <div className="Semester">
      <div className="header">
        <div className="title">
          <span>{term}</span>
          <span className="credit">XX Credits</span>
        </div>
        <div className="icons"> 
          <BsFillPaletteFill size={headerItemSizes} className="icon" />
          <FiRefreshCw size={headerItemSizes} className="icon rotate" />
        </div>
      </div>
      <div className="body">
        {courseIds.map((courseId) => <Course className = "Course" course = {semesterCourses[courseId]}/>)}
        <AddCourse className = "AddCourse" semId = {semId} inputCourse = {inputCourse}/>
      </div>
    </div>
  );
};
