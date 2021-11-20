// [{type: 1, courses = []}]
const reducer = (state = [], action) => {
  switch (action.type) {
    case "add_sem":
      const newSemester = { type: action.payload, courseIds: [] };
      return [...state, newSemester];
    case "update_course_list":
      // if semester ids match, then add a course
      let updatedSemesters = [];

      state.map((semester) => {
        if (state.indexOf(semester) === action.semId) {
          updatedSemesters.push({
            type: semester.type,
            courseIds : [...semester.courseIds, action.courseId]
          });
        } else {
          updatedSemesters.push(semester);
        }
      });

      return updatedSemesters;
    default:
      return state;
  }
};
export default reducer;
