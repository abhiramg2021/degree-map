import React from "react";
import { Semester } from "./Semester/Semester";
import { useSelector } from "react-redux";
import "./Year.scss";

export const Year = ({ yearId, terms, semesterIds, color }) => {
  const semesters = useSelector((state) => state.semesters);
  return (
    <div className="Year">
      {terms.map((term) => {
        let semId = semesterIds[terms.indexOf(term)];
        let ids = [];
        let inputCourse = "";
        let credits = 0;
        if (semesters[semId] !== undefined) {
          ids = semesters[semId]["ids"];
          inputCourse = semesters[semId]["inputCourse"];
          credits = semesters[semId]["credits"];
        }
        return (
          <Semester
            className="Semester"
            term={`${term} ${term === "Spring" ? yearId + 1: yearId}`}
            semId={semId}
            ids={ids}
            inputCourse={inputCourse}
            credits={credits}
            key = {`${term} ${yearId}`}
            color = {color}
          />
        );
      })}
    </div>
  );
};
