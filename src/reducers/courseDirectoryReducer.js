// courses that are in the dictionary
// parse the json file at the start of the program every time
//{"ACCT" : {courseId: "ACCT 2211", credits: 4, name: "Accounting 1"}
const reducer = (state = [], action) => {
  switch (action.type) {
    case "parse_data":
      const coursesJSON = require("../data/courses.json");
      const data = JSON.parse(coursesJSON);
      const directory = {};
      for (const department in data) {
        const dept = [];
        for (const crs in data[department]) {
          const course = data[department][crs];
          dept.push({
            code: course["course"],
            credits: course["credits"],
            name: course["name"],
          });
        }
        directory[department] = dept
      }
      return directory;
    default:
      return state;
  }
};
export default reducer;
