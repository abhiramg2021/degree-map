// courses that are in the dictionary
// parse the json file at the start of the program every time
//{"ACCT" : {courseId: "ACCT 2211", credits: 4, name: "Accounting 1"}
const reducer = (state = {}, action) => {
  switch (action.type) {
    case "parse_data":
      let URL = "https://gt-scheduler.github.io/crawler/";
      var Httpreq = new XMLHttpRequest();
      Httpreq.open("GET", URL, false);
      Httpreq.send(null);
      let out = JSON.parse(Httpreq.responseText);

      let courses = {};

      out["terms"].forEach((t) => {
        let termUrl = "https://gt-scheduler.github.io/crawler/" + t + ".json";
        Httpreq.open("GET", termUrl, false);
        Httpreq.send(null);
        let termOut = JSON.parse(Httpreq.responseText)["courses"];
        for (const courseId in termOut) {
          let dept = courseId.split(" ")[0];
          if (!courses.hasOwnProperty(dept)) {
            courses[dept] = [];
          }

          const course = termOut[courseId];
          courses[dept][courseId] = {
            name: course[0],
            credits: course[1][Object.keys(course[1])[0]][2],
            prerequisites: course[2],
          };
        }
      });
      return courses;
    default:
      return state;
  }
};
export default reducer;
