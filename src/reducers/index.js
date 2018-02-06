import { combineReducers } from 'redux'
import emotion from './emotion'
import userinfo from "./userinfo"

export default combineReducers({
    emotion,
    userinfo
})