// [{type: 1, courses = [], inputCourse: ""}]
const reducer = (state = [], action) => {
  let newSemesters = [];
  switch (action.type) {
    case "add_sem":
      const newSemester = {
        type: action.payload,
        courseIds: [],
        inputCourse: "",
      };
      return [...state, newSemester];
    case "update_course_list":
      newSemesters = [];
      // eslint-disable-next-line
      state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          newSemesters.push({
            type: semester.type,
            courseIds: [...semester.courseIds, action.courseId],
            inputCourse: "",
          });
        } else {
          newSemesters.push(semester);
        }
      });

      return newSemesters;
    case "update_input_course":
      newSemesters = [];
      // eslint-disable-next-line
      state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          newSemesters.push({
            type: semester.type,
            courseIds: semester.courseIds,
            inputCourse: action.input,
          });
        } else {
          newSemesters.push(semester);
        }
      });
      return newSemesters;
    case "delete_sem":
      newSemesters = [];
      newSemesters = state.filter((semester) => {
        if (semester.semId === action.semId) {
          return false;
        }
        return true;
      });
      return newSemesters;
    case "delete_course_from_sem":
      newSemesters = [];
      newSemesters = state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          semester["courseIds"] = semester["courseIds"].filter((id) => {
            if (id === action.courseId) {
              return false;
            }
            return true;
          });
        }
        return semester;
      });

      return newSemesters;
    default:
      return state;
  }
};
export default reducer;
