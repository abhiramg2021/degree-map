import React from 'react'
import {GoPlus} from 'react-icons/go'
export const SearchCourse = ({course}) => {
    return (
        <div className = "SearchCourse">
            <span>{course.couresName}</span>
            <span>{course.courseCredits}</span>
            <span>{course.courseId}</span>
            <GoPlus/>
        </div>
    )
}
