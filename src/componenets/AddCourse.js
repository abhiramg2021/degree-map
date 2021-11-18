
import React, { useState } from 'react'

export const AddCourse = () => {
    const placeholder = "XXX 0000"
    const charLimit = placeholder.length
    const [inputCourse, setInputCourse] = useState('')


    // prevents too long of input, and makes it so that the letters are always upper case
    const handleChange = (event) =>{ 
        let currentText = event.target.value

        if(charLimit - currentText.length >0){
            setInputCourse(currentText.toUpperCase())
        }

    }
    return (
        <div className = "AddCourse">
            <input
                placeholder = "XXX 0000"
                value = {inputCourse}
                onChange = {handleChange}/>
        </div>
    )
}
