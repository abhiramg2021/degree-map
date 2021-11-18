/// year action-creators

export const addYear = () => {
  return (dispatch) => {
    dispatch({
      type: "add",
    });
  };
};

export const deleteYear = (year) => {
  return (dispatch) => {
    dispatch({
      type: "delete",
      payload: year,
    });
  };
};

// semester action-creators

export const newSemester = (type) => {
    return(dispatch) =>{
        dispatch({
            type : "add_sem",
            payload: type
        })
    }
}

// course action-creators

export const newCourse = (courseId, courseCredits) => {
  return (dispatch) => {
    dispatch({
      type: "add_course",
      courseId: courseId,
      courseCredits: courseCredits,
    });
  };
  
};


export const parseData = () => {
  return (dispatch) => {
    dispatch({
      type: "parse_data"
    });
  };
  
};
