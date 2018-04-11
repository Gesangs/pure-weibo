import * as actionTypes from '../constants/store'

export function setText(data) {
    return {
        type: actionTypes.SET_TEXT,
        data
    }
}