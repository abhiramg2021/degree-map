import React from "react";
import { Search } from "./componenets/Search";
import { YearList } from "./componenets/YearList";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./app/index";

const App = () => {
  const dispatch = useDispatch();
  const { addYear, deleteYear, newCourse, newSemester, parseData } =
    bindActionCreators(actionCreators, dispatch);

  // parse the data in the json file at program start
  useEffect(() => {
    parseData()
  }, []);

  return (
    <div className="App">
      <YearList />
      {/* <Search/> */}
    </div>
  );
};

export default App;
