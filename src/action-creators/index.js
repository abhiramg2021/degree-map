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

export const newSemester = (type, yearId) => {
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

export const deleteAllCourses = (semId, ids) => {
  return (dispatch) => {
    ids.forEach((courseId) => {
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
      type: "update_"+type,
      year: year
    });
  };
}