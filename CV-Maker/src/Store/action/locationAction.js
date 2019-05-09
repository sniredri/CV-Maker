import * as actionType from "./actionType"
export const saveLocation = (data) => {
    return {
        type: actionType.SAVE_LOCATION,
        payload: data
    }
}


export const locationTouched = () => {
    return {
        type: actionType.LOCATION_TOUCHED,
        isTouched: true
    }
}