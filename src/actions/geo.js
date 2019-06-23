import { remoteCall } from "./action";

export const getCity = (state, city) => (dispatch) => {
    dispatch(remoteCall("geo/loc/" + state + "/" + city, "GET", "GET_CITY_REQUEST", "GET_CITY_SUCCESS",null))    
}