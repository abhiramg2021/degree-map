import React from 'react'
import { BsTrashFill } from 'react-icons/bs' 
import "../style.scss"

export const Course = ({course}) => {
    return (
        <div className = "Course">
            <span>{course.code}</span>
            <span>{course.credits}</span>
            <BsTrashFill/>
        </div>
    )
}