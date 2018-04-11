import { combineReducers } from "redux";
import emotion from "./emotion";
import userinfo from "./userinfo";
import tip from "./tip";

export default combineReducers({
  emotion,
  userinfo,
  tip
});
