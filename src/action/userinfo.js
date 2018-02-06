import * as actionTypes from '../constants/store'

export function update(data) {
    return {
        type: actionTypes.GET_USERINFO,
        data
    }
}