import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/index";
import { Result } from "../components/Result/Result";
import "./App.scss";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { Semester } from "../components/Semester/Semester";
const App = () => {
  const years = useSelector((state) => state.years);
  const semesters = useSelector((state) => state.semesters);
  const semesterCourses = useSelector((state) => state.semesterCourses);
  const inputText = useSelector((state) => state.inputText);
  const directory = useSelector((state) => state.courseDirectory);
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const { newSemester, parseData } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const dayPassed = () => {
    var date = new Date().toLocaleDateString();
    if (localStorage["degree-map-date"] === date) return false;

    localStorage["degree-map-date"] = date;
    return true;
  };

  useEffect(
    () => {
      if (dayPassed || Object.keys(semesters).length === 0) {
        parseData();
      }
    },
    // eslint-disable-next-line
    []
  );

  Object.keys(years).forEach((yearId) => {
    if (years[yearId]["semesterIds"].length === 0) {
      const terms = years[yearId]["terms"];
      terms.forEach((term) => {
        newSemester(term, yearId);
      });
    }
  });

  const searchRender = () => {
    let inputDept = "";
    if (Object.keys(inputText).length > 0) {
      inputDept = inputText["text"].split(" ")[0];
    }
    // if the input is a valid directory
    if (inputDept in directory) {
      // eslint-disable-next-line
      return Object.keys(directory[inputDept]).map((courseId) => {
        for (const semId in semesterCourses) {
          if (courseId === semId) {
            return false;
          }
        }

        if (courseId.includes(inputText["text"])) {
          return (
            <Result
              course={directory[inputDept][courseId]}
              className="Result"
              courseId={courseId}
              color={colors.search}
            />
          );
        }
      });
    }
  };

  return (
    <div className={"App " + colors.backer}>
      <Header color={colors.backer} />
      <div className="Body">
        <div className="Years cell-1">
          {Object.keys(years).map((yearId) => {
            let terms = years[yearId]["terms"];
            let semesterIds = years[yearId]["semesterIds"];
            return terms.map((term) => {
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
                  semId={semId}
                  courseIds={courseIds}
                  inputCourse={inputCourse}
                  credits={credits}
                  color={colors.sems}
                />
              );
            });
          })}
        </div>
        <div className="Search cell-2">{searchRender()}</div>
      </div>
      <Footer color={colors.backer} />
    </div>
  );
};

export default App;
