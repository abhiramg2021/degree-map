import React from "react";
import { Semester } from "./SemesterComponent/Semester";
import { useSelector} from "react-redux";
import "./Year.scss"
const TERMS = { 1: "Fall", 2: "Spring", 3: "Summer" };

export const Year = ({ yearId, terms, semesterIds }) => {
  const semesters = useSelector(state => state.semesters)
  return (
    <div className="Year">

      {terms.map((term) => {
        let semId = semesterIds[terms.indexOf(term)];
        term = TERMS[term];
        let courseIds = []
        let inputCourse = ""
        if (semesters[semId] !== undefined){
          courseIds = semesters[semId]["courseIds"]
          inputCourse = semesters[semId]["inputCourse"]
        }
        return <Semester className = "Semester" term={`${term} ${yearId}`} semId={semId} courseIds = {courseIds} inputCourse = {inputCourse}/>;
      })}
      {/* Add another semester button  */}
    </div>
  );
};
