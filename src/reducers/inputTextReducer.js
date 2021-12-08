const reducer = (state = {}, action) => {
  switch (action.type) {
    case "update_input":
      return {
        text: action.text,
        semId: action.semId,
        key: action.key,
      };
    default:
      return state;
  }
};
export default reducer;
