//[{year: 2021, terms: [1, 2,3], semester: [1, 2, 3] }]

const yearGen = ({ baseYear, len }) => {
  const defState = [];
  for (let yearId = baseYear; yearId < len + baseYear; yearId++) {
    defState.push({ yearId: yearId, terms: [1, 2, 3], semester: [1, 2, 3] });
  }

  return defState;
};

let initialState = yearGen({ baseYear: 2021, len: 4 });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "add":
      const lastYearId = state[state.length - 1]["yearId"] + 1;
      const newYear = yearGen({ baseYear: lastYearId, len: 1 });
      return [...state, ...newYear];
    case "delete":

      let newYears =[]
      if (action.payload !== undefined){
        let yearId = action.payload
        newYears = state.filter((year) => {
          if (year["yearId"] === yearId){
            return false;
          }
          return true;
        })
        return newYears;
      } else{
        newYears = state.slice(0, -1)
        return newYears;
      }
    default:
      return state;
  }
};

export default reducer;
