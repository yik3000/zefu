import { remoteCall } from "./action";

export const getServices = (categoryId) => dispatch => {
    dispatch(remoteCall("service" + "/?categoryId=" + categoryId,"GET","GET_SERVICE_REQUEST","GET_SERVICE_SUCCESS"));
}

export const updateService = (service) => (dispatch,state) => {
    dispatch(remoteCall("service","PUT","UPDATE_SERVICE_REQUEST","UPDATE_SERVICE_SUCCESS", service, state().account.token, function(cb){
        dispatch(getServices());
    }));
}

export const removeService = (service) => (dispatch,state) => {
    dispatch(remoteCall("service","DELETE","REMOVE_SERVICE_REQUEST","REMOVE_SERVICE_SUCCESS", service, state().account.token, function(cb){
        dispatch(getServices())
    }));
}

export const addService = (service,callback) => (dispatch,state) =>{
    dispatch(remoteCall("service","POST", "POST_SERVICE_REQUEST","POST_SERVICE_SUCCESS",{Name:service.Name, CategoryId:service.CategoryId}, state().account.token, function(cb){
        if(cb.status == "online"){
            dispatch(getServices());
            if(callback!=null){
                callback(cb)
            }
        }
    }))
}


export const getServiceCategories = () => (dispatch) => {
    dispatch(remoteCall("service/category","GET","GET_SERVICE_CATEGORY_REQUEST","GET_SERVICE_CATEGORY_SUCCESS"));
}

export const addServiceCategory = (category,callback) => (dispatch,state) =>{
    dispatch(remoteCall("service/category","POST", "POST_SERVICE_CATEGORY_REQUEST","POST_SERVICE_CATEGORY_SUCCESS",
        {Name:category.name},state().account.token, function(cb){        
            if(cb.status == "online"){
                dispatch(getServiceCategories());
                if(callback!=null){
                    callback(cb)
                }
        }
    }))
}
export const updateServiceCategory = (category,callback) => (dispatch,state) =>{
    dispatch(remoteCall("service/category","PUT", "PUT_SERVICE_CATEGORY_REQUEST","PUT_SERVICE_CATEGORY_SUCCESS",
        category,state().account.token, function(cb){        
            if(cb.status == "online"){
                dispatch(getServiceCategories());
                if(callback!=null){
                    callback(cb)
                }
        }
    }))
}

