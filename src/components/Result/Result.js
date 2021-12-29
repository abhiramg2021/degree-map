import React, { useState } from "react";
import "./Result.scss";
import { Info } from "./Info/Info";
import { Prereqs } from "./Prereqs/Prereqs";
export const Result = ({ course, courseId }) => {
  const [showPrereqs, setShowPrereqs] = useState(false);
  const [taken, setTaken] = useState(false)
  const [metReqs, setMetReqs] = useState([])
  return (
    <div className="Result">
      <Info
        course={course}
        courseId={courseId}
        showPrereqs={showPrereqs}
        setShowPrereqs={setShowPrereqs}
        taken = {taken}
        metReqs = {metReqs}
      />
      <Prereqs course={course} showPrereqs = {showPrereqs} setTaken = {setTaken} metReqs = {metReqs} setMetReqs = {setMetReqs}/>
    </div>
  );
};
