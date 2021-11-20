const reducer = (state = [], action) =>{
    switch(action.type){
        case "update_input":
            return [action.input, action.semId]
        default:
            return state;
    }
}
export default reducer;