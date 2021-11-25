import React from "react";
import { GoPlus } from "react-icons/go";
import "./SearchCourse.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../app/index";
export const SearchCourse = ({ course }) => {
  const inputText = useSelector((state) => state.inputText)
  const dispatch = useDispatch();
  
  const { addCourse } = bindActionCreators(
    actionCreators,
    dispatch
  );
  return (
    <div className="SearchCourse">
      <span>{course.name}</span>
      <span>{course.credits} Credits</span>
      <span>{course.code}</span>
      <GoPlus
        className="icon"
        size="20px"
        onClick={() => {
          addCourse(course, inputText[1])
        }}
      />
    </div>
  );
};
