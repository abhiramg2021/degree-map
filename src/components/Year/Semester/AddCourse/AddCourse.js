import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../redux/index";
import "./AddCourse.scss";

export const AddCourse = ({semId, inputCourse, credits}) => {
    const placeholder = "XXXX 0000" 
    const charLimit = placeholder.length

    const dispatch = useDispatch();
  const { updateInput } = bindActionCreators(actionCreators, dispatch);

    const handleChange = (event) =>{ 
        let currentText = event.target.value
        if(charLimit - currentText.length >=0){
            updateInput(currentText.toUpperCase(), semId, true, credits)
        }

    }
    return (
        <div className = "AddCourse">
            <input
                placeholder = "XXXX 0000"
                value = {inputCourse}
                onChange = {handleChange}
                onClick = {handleChange}
                />
        </div>
    )
}
