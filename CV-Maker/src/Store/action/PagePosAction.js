import * as actionType from "./actionType"
export const nextPage = () => {
    return {
        type: actionType.NEXT_PAGE
    }
}
export const prevPage = () => {
    return {
        type: actionType.PREV_PAGE
    }
}
export const makePageIndexZero = () => {
    return {
        type: actionType.ZERO_PAGE
    }
}