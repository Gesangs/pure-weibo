import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from './store/configureStore'
import registerServiceWorker from "./registerServiceWorker";
import RouterMap from "./router/routermap"
const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <RouterMap />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
