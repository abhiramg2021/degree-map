// [{type: 1, courses = [], inputCourse: "", credits = 4}]
const reducer = (state = {}, action) => {
  let newSemesters = { ...state };
  switch (action.type) {
    case "add_sem":
      const newSemester = {
        courseIds: [],
        inputCourse: "",
        credits: 0,
      };
      newSemesters = { ...state };
      newSemesters[action.semId] = newSemester;
      return newSemesters;
    case "update_course_list":
      newSemesters[action.semId]["courseIds"].push(action.courseId);
      newSemesters[action.semId]["credits"] += action.credits;
      return newSemesters;
    case "update_input_course":
      newSemesters[action.semId]["inputCourse"] = action.text;
      return newSemesters;
    case "delete_course_from_sem":
      newSemesters[action.semId]["courseIds"].filter((courseId) => {
        if (courseId === action.courseId) {
          newSemesters[action.semId]["credits"] -= action.credits;
          return false;
        }
        return true;
      });
      return newSemesters;
    default:
      return state;
  }
};
export default reducer;
