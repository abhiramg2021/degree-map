import React from 'react'
import { AddCourse } from './AddCourse'
import {CourseList} from './CourseList'

export const Semester = ({courses}) => {
    return (
        <div className = "Semester">
            <CourseList/>
            <AddCourse/>
        </div>
    )
}
