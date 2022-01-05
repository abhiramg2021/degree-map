import { combineReducers } from "redux";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";
import courseReducer from "./semesterCourseReducer";
import courseDirectoryReducer from "./courseDirectoryReducer";
import inputTextReducer from "./inputTextReducer";
import settingsReducer from "./settingsReducer";

const reducers = combineReducers({
  years: yearReducer,
  semesters: semesterReducer,
  semesterCourses: courseReducer,
  courseDirectory: courseDirectoryReducer,
  inputText: inputTextReducer,
  settings: settingsReducer,
});

export default reducers;
