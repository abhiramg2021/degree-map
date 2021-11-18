import { combineReducers } from "redux";
import yearReducer from "./yearReducer";
import semesterReducer from "./semesterReducer";
import courseReducer from "./semesterCourseReducer";
import courseDirectoryReducer from "./courseDirectoryReducer"


const reducers = combineReducers({
  years: yearReducer,
  semesters: semesterReducer,
  semesterCourses: courseReducer,
  courseDirectory: courseDirectoryReducer
});

export default reducers;
