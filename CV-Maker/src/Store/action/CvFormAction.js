import * as actionType from "./actionType"
export const saveCvData = (data) => {
    return {
        type: actionType.SAVE_CV_DATA,
        payload: data
    }
}
export const isLoadedToggle=(boolean)=>{
    return{
        type: actionType.IS_LOADED_TOGGLE,
        statement: boolean
    }
}
