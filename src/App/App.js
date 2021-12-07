import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { Year } from "../components/Year/Year";
import { Result } from "../components/Result/Result";
import "./App.scss";
import { Header } from "../components/Header/Header";
import { nanoid } from "@reduxjs/toolkit";
import { Footer } from "../components/Footer/Footer";

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
  }, 
  // eslint-disable-next-line
  []);
  const searchRender = () => {
    let inputDept = "";
    if (inputText.length > 0) {
      inputDept = inputText[0].split(" ")[0];
    }
    if (inputDept in directory) {
      // eslint-disable-next-line
      return directory[inputDept].map((course) => {
        for (const semId in semesterCourses) {
          if (course["code"] === semesterCourses[semId]["code"]) {
            // eslint-disable-next-line
            return;
          }
        }
        if (course["code"].includes(inputText[0])) {
          return <Result course={course} className="Result" courseId = {nanoid()}/>;
        }
      });
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="Body">
        <div className="Years">
          {years.map((year) => (
            <Year
              yearId={year["yearId"]}
              terms={year["terms"]}
              semesterIds={year["semesterIds"]}
            />
          ))}
          {/* add year button with textbox for autofill suggestion */}
        </div>
        <div className="Search">
          {searchRender()}
          </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;
