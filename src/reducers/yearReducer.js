//[{year: 2021, terms: [1, 2,3], semester: [1, 2, 3] }]

const yearGen = ({ baseYear, len }) => {
  const defState = {};
  for (let yearId = baseYear; yearId < len + baseYear; yearId++) {
    defState[yearId] = {
      terms: ["Summer", "Fall", "Spring"],
      semesterIds: [],
    };
  }
  return defState;
};
let initialState = yearGen({ baseYear: 2021, len: 4 });

const reducer = (state = initialState, action) => {
  let newYears = { ...state };
  let diff = 0;
  switch (action.type) {
    case "change_start":
      diff = Math.abs(action.bound - action.year);
      if (action.year < action.bound) {
        let addYears = yearGen({
          baseYear: action.year,
          len: diff,
        });
        newYears = {...addYears, ...newYears};
      } else if (action.year > action.bound) {
        for (let yearId = action.bound; yearId < action.year; yearId++) {
          delete newYears[yearId]
        }
      }
      return newYears;
      case "change_end":
        diff = Math.abs(action.bound - action.year);
        if (action.year > action.bound) {
          let addYears = yearGen({
            baseYear: action.year,
            len: diff,
          });
          newYears = {...newYears, ...addYears};
        } else if (action.year < action.bound) {
          for (let yearId = action.bound; yearId > action.year; yearId--) {
            delete newYears[yearId]
          }
        }
        return newYears;
    
    case "update_sem_list":
      newYears[action.yearId]["semesterIds"].push(action.semId);
      return newYears;
    default:
      return state;
  }
};

export default reducer;
