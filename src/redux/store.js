import { applyMiddleware, createStore, compose } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";
import { saveState, loadState } from "./localStorage.js";
import { throttle } from "lodash";


let enhancer = applyMiddleware(thunk);
if (navigator.userAgent.includes("Chrome")){
  enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const persistedState = loadState();
export const store = createStore(
  reducers,
  persistedState,
  enhancer
);
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
