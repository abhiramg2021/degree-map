import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { Year } from "../components/Year/Year";
import { Result } from "../components/Result/Result";
import "./App.scss";
import { Header } from "../components/Header/Header";
import { nanoid } from "@reduxjs/toolkit";
import { Footer } from "../components/Footer/Footer";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const App = () => {
  const years = useSelector((state) => state.years);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const inputText = useSelector((state) => state.inputText);
  const directory = useSelector((state) => state.courseDirectory);
  const [searchPos, setSearchPos] = useState(0);
  let directoryLength = 0;
  const dispatch = useDispatch();
  const displayAmt = 6;
  const { newSemester, parseData, updateInput } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(
    () => {
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
    []
  );
  const searchRender = () => {
    let inputDept = "";
    if (Object.keys(inputText).length > 0) {
      inputDept = inputText["text"].split(" ")[0];
    }
    // if the input is a valid directory
    if (inputDept in directory) {
      // only run when backspace is not clicked
      // if (inputDept === inputText["text"] && inputText["key"]) {
      //   updateInput(inputText["text"] + " ");
      // }

      // eslint-disable-next-line
      directoryLength = directory[inputDept].length
      return directory[inputDept]
        .slice(searchPos, searchPos + displayAmt)
        .map((course) => {
          for (const semId in semesterCourses) {
            if (course["code"] === semesterCourses[semId]["code"]) {
              // eslint-disable-next-line
              return;
            }
          }
          if (course["code"].includes(inputText["text"])) {
            return (
              <Result course={course} className="Result" courseId={nanoid()} />
            );
          }
        });
    }
  };

  const upArrowRender = () => {
    if (searchPos - displayAmt >= 0 && directoryLength > 0) {
      return (
        <FaArrowUp
          className="arrow"
          size="30px"
          onClick={() => {
            setSearchPos(searchPos - displayAmt);
          }}
        />
      );
    }
  };

  const downArrowRender = () => {
    if (directoryLength - searchPos > displayAmt) {
      return (
        <FaArrowDown
          className="arrow"
          size="30px"
          onClick={() => {
            setSearchPos(searchPos + displayAmt);
          }}
        />
      );
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
        </div>
        <div className="Search">
          {searchRender()}
          <div className="arrows">
            {upArrowRender()}
            {downArrowRender()}
          </div>
        </div>
        <div className = "Degree">

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
