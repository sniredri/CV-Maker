import * as actionType from "./actionType"
export const savePicData = (data) => {
    return {
        type: actionType.SAVE_PIC_DATA,
        payload: data
    }
}
