import * as actionTypes from '../constants/store'

const initialState = {}

export default function emotion (state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_EMOTION:
            return action.data
        default:
            return state
    }
}