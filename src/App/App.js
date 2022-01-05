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
  let directoryLength = 0;
  const dispatch = useDispatch();
  const { newSemester, parseData, } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(
    () => {
      if (semesters.length === 0) {
        parseData();
        for (const yearListIndex in years) {
          const terms = years[yearListIndex]["terms"];
          const yearId = years[yearListIndex]["yearId"];
          for (const termsListIndex in terms) {
            let term = terms[termsListIndex];
            newSemester(term, yearId, semesters.length);
          }
        }
      }
    },
    // eslint-disable-next-line
    []
  );

  const searchRender = () => {
    let inputDept = "";
    if (Object.keys(inputText).length > 0) {
      inputDept = inputText["text"].split(" ")[0];
    }
    // if the input is a valid directory
    if (inputDept in directory) {
      // eslint-disable-next-line
      directoryLength = directory[inputDept].length;
      return (
        directory[inputDept]
          // eslint-disable-next-line
          .map((course) => {
            for (const semId in semesterCourses) {
              if (course["id"] === semesterCourses[semId]["code"]) {
                // eslint-disable-next-line
                return;
              }
            }
            if (course["id"].includes(inputText["text"])) {
              return (
                <Result
                  course={course}
                  className="Result"
                  courseId={nanoid()}
                />
              );
            }
          })
      );
    }
  };

  return (
    <div className="App p black">
      <Header />
      <div className="Body">
        <div className="Years cell-1">
          {years.map((year) => (
            <Year
              yearId={year["yearId"]}
              terms={year["terms"]}
              semesterIds={year["semesterIds"]}
              key = {year["yearId"]}
            />
          ))}
        </div>
        <div className="Search cell-2">
          {searchRender()}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
