import { combineReducers } from "redux";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";
import courseReducer from "./semesterCourseReducer";
import courseDirectoryReducer from "./courseDirectoryReducer";
import inputTextReducer from "./inputTextReducer";
import colorReducer from "./colorReducer";

const reducers = combineReducers({
  years: yearReducer,
  semesters: semesterReducer,
  semesterCourses: courseReducer,
  courseDirectory: courseDirectoryReducer,
  inputText: inputTextReducer,
  colors: colorReducer,
});

export default reducers;
