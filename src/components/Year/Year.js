import React from "react";
import { Semester } from "./Semester/Semester";
import { useSelector } from "react-redux";
import "./Year.scss";

export const Year = ({ yearId, terms, semesterIds }) => {
  const semesters = useSelector((state) => state.semesters);
  return (
    <div className="Year">
      {terms.map((term) => {
        let semId = semesterIds[terms.indexOf(term)];
        let courseIds = [];
        let inputCourse = "";
        let credits = 0;
        if (semesters[semId] !== undefined) {
          courseIds = semesters[semId]["courseIds"];
          inputCourse = semesters[semId]["inputCourse"];
          credits = semesters[semId]["credits"];
        }
        return (
          <Semester
            className="Semester"
            term={`${term} ${term === "Spring" ? yearId + 1: yearId}`}
            semId={semId}
            courseIds={courseIds}
            inputCourse={inputCourse}
            credits={credits}
            key = {`${term} ${yearId}`}
          />
        );
      })}
    </div>
  );
};
