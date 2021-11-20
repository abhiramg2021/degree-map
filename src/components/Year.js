import React from "react";
import { Semester } from "./Semester";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../app/index";
const TERMS = { 1: "Fall", 2: "Spring", 3: "Summer" };

export const Year = ({ yearId, terms, semesterIds }) => {
  const semesters = useSelector(state => state.semesters)
  return (
    <div className="year">

      {terms.map((term) => {
        let semId = semesterIds[terms.indexOf(term)];
        term = TERMS[term];
        let courseIds = []

        // fix this so that you can return the courses list down
        if (semesters[semId] !== undefined){
          courseIds = semesters[semId]["courseIds"]
        }
        return <Semester term={`${term} ${yearId}`} semId={semId} courseIds = {courseIds}/>;
      })}
      {/* Add another semester button  */}
    </div>
  );
};
