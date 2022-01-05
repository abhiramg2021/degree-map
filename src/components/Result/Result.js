import React, { useState } from "react";
import "./Result.scss";
import { Info } from "./Info/Info";
import { Prereqs } from "./Prereqs/Prereqs";
export const Result = ({ course, courseId, color }) => {
  const [showPrereqs, setShowPrereqs] = useState(false);
  const [taken, setTaken] = useState(false);
  return (
    <div className={"Result p " + color}>
      <Info
        course={course}
        courseId={courseId}
        showPrereqs={showPrereqs}
        setShowPrereqs={setShowPrereqs}
        taken={taken}
        color = {color}
      />
      <Prereqs
        course={course}
        showPrereqs={showPrereqs}
        setTaken={setTaken}
        color ={color}
      />
    </div>
  );
};
