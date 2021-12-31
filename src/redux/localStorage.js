export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("degree-map2");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("degree-map2", serializedState);
  } catch {
    // ignore write errors
  }
};
