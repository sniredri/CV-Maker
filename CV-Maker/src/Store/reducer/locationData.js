import * as actionType from "../action/actionType"
import { updateObject } from './utilReducer'
//object in javacsript are always working as refenreces.
const initialState = {
    locSaved: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_LOCATION: {
            return updateObject(state, action.payload)
        }
        case actionType.LOCATION_TOUCHED: {
            return updateObject(state, {locSaved: action.isTouched})
        }
        
        default:
            return state;
    }

}

export default reducer