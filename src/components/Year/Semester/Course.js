import React from 'react'
import { BsTrashFill } from 'react-icons/bs' 
import "./Semester.scss"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../app/index";

export const Course = ({course, semId, courseId}) => {
    const dispatch = useDispatch();
    const {deleteCourse} = bindActionCreators(
        actionCreators,
        dispatch
      );
    return (
        <div className = "Course">
            <span>{course.code}</span>
            <span>{course.credits} Credits</span>
            <BsTrashFill className = "icon" size = "1.25em" onClick = {() => deleteCourse(courseId, semId)}/>
        </div>
    )
}
