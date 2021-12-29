const lintOn = (m) => {
    lintClassModify(document.getElementsByClassName("c_false"), "req", "red");
    lintClassModify(document.getElementsByClassName("c_true"), "req", "green");
  };
  // Helper Function
  const lintOff = () => {
    lintClassModify(document.getElementsByClassName("c_false"), "red", "req");
    lintClassModify(document.getElementsByClassName("c_true"), "green", "req");
  };
  // Helper Function
  const lintClassModify = (list, o, n) => {
    if (list.length > 0) {
      for (const cl in list) {
        if (typeof list[cl].className == typeof "")
          list[cl].className = list[cl].className.replace(o, n);
      }
    }
  };
  