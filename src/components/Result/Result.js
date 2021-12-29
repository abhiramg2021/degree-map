import React from "react";
import "./Result.scss";
import { Info } from "./Info/Info";
import { Prereqs } from "./Prereqs/Prereqs";
export const Result = ({ course, courseId }) => {
  

  return (
    <div className="Result">
      <Info course = {course} courseId={courseId} cond = {false}/>
      <Prereqs course = {course}/>
    </div>
  );
};
