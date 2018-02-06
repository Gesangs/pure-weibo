import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Key, access_token,  reUri } from "./config/config.js";
import axios from "axios";
import configureStore from './store/configureStore'
import registerServiceWorker from "./registerServiceWorker";
import RouterMap from "./router/routermap"
const store = configureStore()

const Code = window.location.href.split("=")[1];
if (!Code) {
  window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${Key}&response_type=code&redirect_uri=${reUri}`;
}
if (!access_token) {
  _getShouquan();
}
function _getShouquan() {
  const Code = window.location.href.split("=")[1];
  axios
    .get("/api/shouquan", {
      params: Code
    })
    .then(res => {
      const data =  JSON.parse(res.data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("uid", data.uid);
    });
}

ReactDOM.render(
  <Provider store={store}>
    <RouterMap />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
