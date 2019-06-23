import { remoteCall } from "./action";

export const getZefuByCategory = (categoryId) => (dispatch) => {
        dispatch(remoteCall("zefu" + "/?categoryId=" + categoryId,"GET", "GET_ZEFUS_REQUEST","GET_ZEFUS_SUCCESS",null));    
}
export const getZefuById = (userId) => (dispatch) => {
    dispatch(remoteCall("zefu" + "/ " + userId,"GET", "GET_ZEFU_REQUEST","GET_ZEFU_SUCCESS",null));    
}


