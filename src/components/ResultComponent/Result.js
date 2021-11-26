import React from "react";
import { GoPlus } from "react-icons/go";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../app/index";
import { MdShare } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
export const Result = ({ course }) => {
  const inputText = useSelector((state) => state.inputText);
  const dispatch = useDispatch();

  const { addCourse } = bindActionCreators(actionCreators, dispatch);
  return (
    //there is a div wrapping result to add spacing between every element
    <div>
      <div className="Result">
        <div className="text">
          <span className="code">{course.code}</span>
          <span className="course">{course.name}</span>
          <span className="credit">{course.credits} Credits</span>
        </div>

        <div className="icons">
          <GoPlus
            className="icon rotate"
            size="20px"
            onClick={() => {
              addCourse(course, inputText[1]);
            }}
          />
          <MdShare className="icon rotate" size="20px" />
          <BsInfoCircle className="icon" size="20px" />
        </div>
      </div>
      <div className = "Spacer"></div>
    </div>
  );
};
