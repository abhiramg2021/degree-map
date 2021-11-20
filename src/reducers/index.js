import { combineReducers } from "redux";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";
import courseReducer from "./semesterCourseReducer";
import courseDirectoryReducer from "./courseDirectoryReducer"
import inputTextReducer from "./inputTextReducer"


const reducers = combineReducers({
  years: yearReducer,
  semesters: semesterReducer,
  semesterCourses: courseReducer,
  courseDirectory: courseDirectoryReducer,
  inputText: inputTextReducer
});

export default reducers;
