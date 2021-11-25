import React from "react";
import { AddCourse } from "./AddCourse";
import { useSelector } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import { BsFillPaletteFill } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";
import { Course } from "./Course";

export const Semester = ({ term,courseIds, semId, inputCourse}) => {
  const semesterCourses = useSelector(state => state.semesterCourses)
  const headerItemSizes = "1.25em";
  return (
    <div className="semester">
      <div className="header">
        <div className="title">
          <span>{term}</span>
          <span className="semesterCredits">XX Credits</span>
        </div>
        <div className="icons">
          <AiFillCaretDown className="icon" size={headerItemSizes} />
          <BsFillPaletteFill size={headerItemSizes} className="icon" />
          <FiRefreshCw size={headerItemSizes} className="icon" />
        </div>
      </div>
      <div className="body">
        {courseIds.map((courseId) => <Course course = {semesterCourses[courseId]}/>)}
        <AddCourse semId = {semId} inputCourse = {inputCourse}/>
      </div>
    </div>
  );
};
