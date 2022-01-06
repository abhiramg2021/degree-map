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

export const newSemester = (term, yearId) => {
  return (dispatch, getState) => {

    let year = term === "Spring" ? parseInt(yearId) + 1 : yearId
    let semId = `${term} ${year}`
    dispatch({
      type: "add_sem",
      yearId: yearId,
      semId: semId,
    });
    dispatch({
      type: "update_sem_list",
      yearId: yearId,
      semId: semId,
    });
  };
};

export const addCourse = (course, semId, courseId, prereqs) => {
  return (dispatch) => {
    dispatch({
      type: "add_course",
      credits: course.credits,
      courseId: courseId,
      prereqs: prereqs,
    });
    dispatch({
      type: "update_course_list",
      courseId: courseId,
      semId: semId,
      credits: course.credits,
    });
  };
};

export const deleteCourse = (courseId, semId, credits) => {
  return (dispatch) => {
    dispatch({
      type: "delete_course_from_sem",
      courseId: courseId,
      semId: semId,
      credits: credits,
    });

    dispatch({
      type: "delete_course_from_directory",
      semId: semId,
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

export const updateInput = (text, semId, key = true, credits = 0) => {
  return (dispatch, getState) => {
    if (semId === undefined) {
      semId = getState()["inputText"]["semId"];
    }

    dispatch({
      type: "update_input_course",
      text: text,
      semId: semId,
      credits: credits,
    });

    dispatch({
      type: "update_input",
      text: text,
      semId: semId,
      key: key,
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

export const updateSettingsYear = (year, type) => {
  return (dispatch) => {
    dispatch({
      type: "update_" + type + "_year",
      year: year,
    });
  };
};

export const updateColor = (color, type) => {
  return (dispatch) => {
    dispatch({
      type: "update_" + type,
      color: color,
    });
  };
};

export const updateBounds = (year, type, bound) => {
  return (dispatch) => {
    dispatch({
      type: "change_" + type,
      year: year,
      bound: bound,
    });
  };
};
