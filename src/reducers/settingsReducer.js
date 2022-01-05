const reducer = (state = { startYear: 2021, endYear: 2024 }, action) => {
  switch (action.type) {
    case "update_start_year":
      return {startYear: action.year, endYear: state.endYear};
    case "update_end_year":
      return {startYear: state.startYear, endYear: action.year};
    default:
      return state;
  }
};

export default reducer;