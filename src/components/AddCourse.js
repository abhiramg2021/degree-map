import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../app/index";

export const AddCourse = ({semId, inputCourse}) => {
    const placeholder = "XXXX 0000"
    const charLimit = placeholder.length
    const [inputClass, setinputClass] = useState('')

    const dispatch = useDispatch();
  const { updateInput } = bindActionCreators(actionCreators, dispatch);

  console.log(inputCourse)
    // prevents too long of input, and makes it so that the letters are always upper case
    const handleChange = (event) =>{ 
        let currentText = event.target.value

        if(charLimit - currentText.length >=0){
            updateInput(currentText.toUpperCase(), semId)
            setinputClass(currentText.toUpperCase())
            
        }

    }
    return (
        <div className = "AddCourse">
            <input
                placeholder = "XXXX 0000"
                value = {inputClass}
                onChange = {handleChange}/>
        </div>
    )
}
