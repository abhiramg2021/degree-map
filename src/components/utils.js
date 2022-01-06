export const verifyReq = (pr, semId, semesters) => {
    let cond = 0;
    let terms = ["Summer", "Fall", "Spring"];
    let currentYear = parseInt(semId.split(" ")[1]);
    let currName = semId.split(" ")[0];

    Object.keys(semesters).forEach((semId) => {
      let semYear = parseInt(semId.split(" ")[1]);
      let semName = semId.split(" ")[0];

      if (
        semYear < currentYear ||
        (semYear === currentYear &&
          terms.indexOf(currName) <= terms.indexOf(semName))
      ) {
        semesters[semId]["courseIds"].forEach((courseId) => {
          cond = pr === courseId ? cond + 1 : cond;
        });
      }
    });
    return cond === 0 ? false : true;
  };

  