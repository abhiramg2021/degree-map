// [{ courseID: "PHYS 2211", courseCredits: 4}]
// should contain all the courses that will be added to the display lists
// this is not a dictionary of courses, our dictionary will be the the json file itself and however it is parsed
const reducer = (state = {}, action) => {
  let newCourses = {};
  switch (action.type) {
    case "add_course":
      newCourses = state;
      const newCourse = { code: action.code, credits: action.credits, prereqs: action.prereqs};
      newCourses[action.courseId] = newCourse
      return newCourses;
    case "delete_course_from_directory":
      newCourses = state;

      delete newCourses[action.courseId]
      return newCourses;
    default:
      return state;
  }
};
export default reducer;
