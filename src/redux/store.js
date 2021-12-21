import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
import thunk from "redux-thunk";
import {saveState, loadState} from "./localStorage.js"
import { throttle } from "lodash";


/// no save function

// export const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );


// Save Function
const persistedState = loadState();
export const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));