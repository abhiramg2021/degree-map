import { applyMiddleware, createStore } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";
import {saveState, loadState} from "./localStorage.js"
import { throttle } from "lodash";


/// no save function

// export const store = createStore(
//   reducers,
//   {},
//   applyMiddleware(thunk)
// );


// Save Function
const persistedState = loadState();
export const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(thunk)
);
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));