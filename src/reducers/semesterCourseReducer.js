// [{ courseID: "PHYS 2211", courseCredits: 4}]
// should contain all the courses that will be added to the display lists
// this is not a dictionary of courses, our dictionary will be the the json file itself and however it is parsed
const reducer = (state = [], action) => {
  switch (action.type) {
    case "add_course":
      const newCourse = { code: action.code, credits: action.credits };
      return [...state, newCourse];
    case "delete_course_from_directory":
      let newCourses = state.filter((course) => {
        if (state.indexOf(course) === action.courseId) {
          return false;
        }
        return true;
      });

      return newCourses;
    default:
      return state;
  }
};
export default reducer;
