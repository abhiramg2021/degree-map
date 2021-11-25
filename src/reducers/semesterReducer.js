// [{type: 1, courses = [], inputCourse: ""}]
const reducer = (state = [], action) => {
  switch (action.type) {
    case "add_sem":
      const newSemester = {
        type: action.payload,
        courseIds: [],
        inputCourse: "",
      };
      return [...state, newSemester];
    case "update_course_list":
      // if semester ids match, then add a course
      let updatedSemesters = [];

      state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          updatedSemesters.push({
            type: semester.type,
            courseIds: [...semester.courseIds, action.courseId],
            inputCourse: "",
          });
        } else {
          updatedSemesters.push(semester);
        }
      });

      return updatedSemesters;
    case "update_input_course":
      let updatedSemesters2 = [];

      state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          updatedSemesters2.push({
            type: semester.type,
            courseIds: semester.courseIds,
            inputCourse: action.input,
          });
        } else {
          updatedSemesters2.push(semester);
        }
      });
      return updatedSemesters2;
    case "delete_sem":
      let deletedList = [];
      deletedList = state.filter((semester) => {
        if (semester.semId === action.semId) {
          return false;
        }
        return true;
      });
      return deletedList;
    case "delete_course_from_sem":
      let courseList = []
      
      return state;
    default:
      return state;
  }
};
export default reducer;
