import * as actionType from "../action/actionType"
import { updateObject } from './utilReducer'
//object in javacsript are always working as refenreces.
const initialState = {
    CurrentPage: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.NEXT_PAGE: {
            //set object initalState of the reducer with the props that given from component.
            return updateObject(state, { CurrentPage: state.CurrentPage + 1 })
        }
        case actionType.PREV_PAGE: {
            //set object initalState of the reducer with the props that given from component.
            return updateObject(state, { CurrentPage: state.CurrentPage - 1 })
        }
        case actionType.ZERO_PAGE: {
            return updateObject(state, { CurrentPage: 0 })
        }
        default:
            return state;
    }

}

export default reducer