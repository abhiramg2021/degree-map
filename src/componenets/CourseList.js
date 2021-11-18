import React from 'react'
import { Course } from './Course'
export const CourseList = ({courses}) => {
    return (
        <div>
            {courses.map((course) => <Course/>)}
        </div>
    )
}
