import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./app/index";
import { Year } from "./components/Year";
import { SearchCourse } from "./components/SearchCourse";
const App = () => {
  const years = useSelector((state) => state.years);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const inputText = useSelector((state) => state.inputText);
  const directory = useSelector((state) => state.courseDirectory);
  const dispatch = useDispatch();
  const { newSemester, parseData } = bindActionCreators(
    actionCreators,
    dispatch
  );



  useEffect(() => {
    parseData();
    for (const yearListIndex in years) {
      const terms = years[yearListIndex]["terms"];
      const yearId = years[yearListIndex]["yearId"];
      for (const termsListIndex in terms) {
        let term = terms[termsListIndex];
        newSemester(term, yearId, semesters.length);
      }
    }
  }, []);
  const searchRender = () => {
    let inputDept = "";
    if (inputText.length > 0) {
      inputDept = inputText[0].split(" ")[0];
    }
    if (inputDept in directory) {
      return directory[inputDept].map((course) => {
        if (course["code"].includes(inputText[0])) {
          return <SearchCourse course={course} />;
        }
      });
    }
  };

  return (
    <div className="App">
      <div className="years">
        {years.map((year) => (
          <Year
            yearId={year["yearId"]}
            terms={year["terms"]}
            semesterIds={year["semesterIds"]}
          />
        ))}
        {/* add year button with textbox for autofill suggestion */}
      </div>
      <div className="Search">{searchRender()}</div>
    </div>
  );
};

export default App;
