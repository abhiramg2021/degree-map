// [{ courseID: "PHYS 2211", courseCredits: 4}]
// should contain all the courses that will be added to the display lists
// this is not a dictionary of courses, our dictionary will be the the json file itself and however it is parsed
const reducer = (state = [], action) =>{
    switch(action.type){
        case "add_course":
            const newCourse = {code: action.code, credits: action.credits};
            return [...state, newCourse];
        default:
            return state;
    }
}
export default reducer;