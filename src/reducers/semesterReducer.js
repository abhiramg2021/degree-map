// [{type: 1, courses = []}]
const reducer = (state = [], action) =>{
    switch(action.type){
        case "add_sem":
            const newSemester = {type: action.payload, courses: []};
            return [...state, newSemester];
        default:
            return state;
    }
}
export default reducer;