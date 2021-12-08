import React from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux/index";
import { FaInfoCircle,FaShareAlt, FaPlus } from "react-icons/fa";
export const Result = ({ course, courseId}) => {
  const inputText = useSelector((state) => state.inputText);
  const dispatch = useDispatch();
  const size = "15px"
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
          <FaPlus
            className="icon"
            size={size}
            onClick={() => {
              addCourse(course, inputText[1], courseId);
            }}
          />
          <FaShareAlt className="icon vert" size={size} />
          <FaInfoCircle className="icon" size={size} />
        </div>
      </div>
      <div className = "Spacer"></div>
    </div>
  );
};
