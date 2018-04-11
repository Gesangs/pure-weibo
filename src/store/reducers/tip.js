import * as actionTypes from '../constants/store'

const initialState = {}

export default function tip (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_TEXT:
            return action.data
        default:
            return state
    }
}