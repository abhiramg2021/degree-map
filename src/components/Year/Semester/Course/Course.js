import React from 'react'
import { BsTrashFill } from 'react-icons/bs' 
import "./Course.scss"
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";

export const Course = ({course, semId, courseId}) => {
    const dispatch = useDispatch();
    const {deleteCourse} = bindActionCreators(
        actionCreators,
        dispatch
      );
    
    return (
        <div className = "Course p black">
            <span className='code'>{course.code}</span>
            <span className='credit'>{course.credits} Credits</span>
            <BsTrashFill className = "icon" size = "1.25em" onClick = {() => deleteCourse(courseId, semId, course.credits, course.code)}/>
        </div>
    )
}
