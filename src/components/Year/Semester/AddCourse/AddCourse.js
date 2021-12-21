import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";
import "./AddCourse.scss";

export const AddCourse = ({semId, inputCourse}) => {
    const placeholder = "XXXX 0000" 
    const charLimit = placeholder.length

    const dispatch = useDispatch();
  const { updateInput } = bindActionCreators(actionCreators, dispatch);

    // prevents too long of input, and makes it so that the letters are always upper case
    const handleChange = (event) =>{ 
        // let currentText = inputCourse
        // let cond = true
        // // too much weird shit happens with this code
        // if (event.key !== undefined){
        //     if (event.key.length === 1){
        //         currentText += event.key
        //     } else if (event.key === "Backspace"){
        //         currentText = currentText.slice(0, currentText.length - 1)
        //         cond = false
        //     }

        // }

        let currentText = event.target.value
        if(charLimit - currentText.length >=0){
            updateInput(currentText.toUpperCase(), semId, true)
        }

    }
    return (
        <div className = "AddCourse">
            <input
                placeholder = "XXXX 0000"
                value = {inputCourse}
                onChange = {handleChange}
                // onClick = {handleChange}
                // onKeyDown = {handleChange}
                />
        </div>
    )
}
