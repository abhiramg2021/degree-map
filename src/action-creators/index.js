export const addYear = () => {
  return (dispatch) => {
    dispatch({
      type: "add_year",
    });
  };
};

export const deleteYear = (year) => {
  return (dispatch) => {
    dispatch({
      type: "delete_year",
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

export const newSemester = (type, yearId, semId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "add_sem",
      payload: type,
    });

    const semesters = getState()["semesters"];

    dispatch({
      type: "update_sem_list",
      yearId: yearId,
      semId: semesters.length - 1,
    });
  };
};

export const addCourse = (course, semId, courseId) => {
  return (dispatch, getState) => {
    dispatch({
      type: "add_course",
      code: course.code,
      credits: course.credits,
      courseId: courseId
    });
    dispatch({
      type: "update_course_list",
      courseId: courseId,
      semId: semId,
      credits: course.credits
    });
  };
};

export const deleteCourse = (courseId, semId) => {
  return (dispatch) => {
    dispatch({
      type: "delete_course_from_sem",
      courseId: courseId,
      semId: semId,
    });


    dispatch({
      type: "delete_course_from_directory",
      courseId: courseId,
    });
  };
};

export const deleteAllCourses = (semId, courseIds) => {
  return (dispatch) => {
    courseIds.forEach((courseId) => {
      dispatch({
        type: "delete_course_from_sem",
        courseId: courseId,
        semId: semId,
      });
      dispatch({
        type: "delete_course_from_directory",
        courseId: courseId,
      });
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


export const updateInput = (input, semId) => {
  return (dispatch) => {

    dispatch({
      type: "update_input_course",
      input: input,
      semId: semId,
    });

    dispatch({
      type: "update_input",
      input: input,
      semId: semId,
    });
  };
};

export const clearInput = (semId) => {
  return (dispatch) => {
    dispatch({
      type: "update_input_course",
      input: "",
      semId: semId,
    });

    dispatch({
      type: "update_input",
      input: "",
      semId: -1,
    });
  };
};
