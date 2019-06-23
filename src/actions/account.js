import { remoteCall } from "./action";

export const register = (name, username, password, role) => dispatch =>{
    dispatch(remoteCall("user","POST","REGISTER_REQUEST","REGISTER_SUCCESS", {Name:name, UserLogin: {Username:username, Password:password}, Role:role}, null))
}

export const login = (username, password) => dispatch => {
    dispatch(remoteCall("login","POST", "LOGIN_REQUEST","LOGIN_SUCCESS", {username:username, password:password}));
}

export const getMe = () => (dispatch,state) => {
        dispatch(remoteCall("login","GET", "GET_ME_REQUEST","GET_ME_SUCCESS",null,state().account.token));    
}
export const clearNotification = () => dispatch => {
    dispatch({type:'CLEAR_NOTIFICATION'})
}
export const sendNotification = (message) => dispatch =>{
    dispatch({type:"SEND_NOTIFICATION", res:message})
}

export const getMyService = () => (dispatch,state) =>{
    dispatch(remoteCall("login/service","GET", "GET_MY_SERVICE_REQUEST","GET_MY_SERVICE_SUCCESS",null,state().account.token));    
}
export const addService = (service,callback) => (dispatch,state) =>{
    dispatch(remoteCall("service","POST", "POST_SERVICE_REQUEST","POST_SERVICE_SUCCESS",{Name:service.name},state().account.token, function(cb){
        if(cb.status == "online"){
            dispatch(getMyService());
            if(callback!=null){
                callback(cb)
            }
        }
    }))
}
export const pickService = (service,callback) => (dispatch,state) =>{
    dispatch(remoteCall("login/service","POST", "PICK_SERVICE_REQUEST","PICK_SERVICE_SUCCESS",service,state().account.token, function(cb){
        if(cb.status == "online"){
            dispatch(getMyService());
            if(callback!=null){
                callback(cb)
            }
        }
    }))
}

export const clear = () => dispatch => {
    dispatch({type:'CLEAR_SESSION'});
}