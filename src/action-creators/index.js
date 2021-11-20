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

export const updateSem = (yearId, semId) => {
    return (dispatch) => {
      dispatch({
        type: "update_sem_list",
        yearId: yearId,
        semId: semId,
      });
    };  
};

// semester action-creators

export const newSemester = (type, yearId, semId) => {

  return (dispatch, getState) => {
    
      dispatch({
        type: "add_sem",
        payload: type,
      });

      const semesters = getState()["semesters"]

      dispatch({
        type: "update_sem_list",
        yearId: yearId,
        semId: semesters.length - 1,
      });
  };
};



// course action-creators

export const addCourse = (course, semId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "add_course",
      code: course.code,
      credits: course.credits,
    });

    let courses = getState()["semesterCourses"]
    
    dispatch({
      type: "update_course_list",
      courseId: courses.length - 1,
      semId: semId,
    });
    
  };
};

export const parseData = () => {
  return (dispatch) => {
    dispatch({
      type: "parse_data",
    });
  };
};

// input text reducers

export const updateInput = (input, semId) => {
  return (dispatch) => {
    dispatch({
      type: "update_input",
      input: input,
      semId: semId
    });
  };
};