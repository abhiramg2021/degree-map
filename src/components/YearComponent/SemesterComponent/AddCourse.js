import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../app/index";

export const AddCourse = ({semId, inputCourse}) => {
    const placeholder = "XXXX 0000"
    const charLimit = placeholder.length

    const dispatch = useDispatch();
  const { updateInput } = bindActionCreators(actionCreators, dispatch);

    // prevents too long of input, and makes it so that the letters are always upper case
    const handleChange = (event) =>{ 
        let currentText = event.target.value

        if(charLimit - currentText.length >=0){
            updateInput(currentText.toUpperCase(), semId)
        }

    }
    return (
        <div className = "AddCourse">
            <input
                placeholder = "XXXX 0000"
                value = {inputCourse}
                onChange = {handleChange}
                onClick = {handleChange}/>
        </div>
    )
}
