const reducer = (
  state = { backer: "black", sems: "blue", search: "yellow" },
  action
) => {
  switch (action.type) {
    case "update_backer":
      return { backer: action.color, sems: state.sems, search: state.search };
    case "update_sems":
      return { backer: state.backer, sems: action.color, search: state.search };
    case "update_search":
      return { backer: state.backer, sems: state.sems, search: action.color };
    default:
      return state;
  }
};

export default reducer;
