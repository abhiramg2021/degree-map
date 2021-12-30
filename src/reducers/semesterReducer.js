// [{type: 1, courses = [], inputCourse: "", credits = 4}]
const reducer = (state = [], action) => {
  let newSemesters = [];
  switch (action.type) {
    case "add_sem":
      const newSemester = {
        type: action.payload,
        courseIds: [],
        inputCourse: "",
        credits: 0
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
            credits: semester.credits + action.credits
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
            inputCourse: action.text,
            credits: action.credits
          });
        } else {
          newSemesters.push(semester);
        }
      });
      return newSemesters;
    case "delete_course_from_sem":
      console.log(action.id)
      newSemesters = state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          semester["courseIds"] = semester["courseIds"].filter((id) => {
            if (id === action.courseId) {
              semester["credits"] -= action.credits
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
