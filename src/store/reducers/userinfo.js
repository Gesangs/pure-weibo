import * as actionTypes from '../constants/store'

const initialState = {}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_USERINFO:
            return action.data
        default:
            return state
    }
}