import * as actionType from "../action/actionType"
import { updateObject } from './utilReducer'
//object in javacsript are always working as refenreces.
const initialState = {
    UserData: "",
    isLoaded: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_CV_DATA: {
            //set object initalState of the reducer with the props that given from component.
            return updateObject(state, { UserData: action.payload })
        }
        case actionType.IS_LOADED_TOGGLE: {
            return updateObject(state, { isLoaded: action.statement })
        }
        default:
            return state;
    }

}

export default reducer