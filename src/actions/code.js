import { remoteCall } from "./action";

export const getCodeCollections = (city) => (dispatch) => {
    dispatch(remoteCall("code/collection?city="+city, "GET", "GET_CODE_COLLECTION_REQUEST", "GET_CODE_COLLECTION_SUCCESS",null))
}
export const getCode = (collectionId) => (dispatch) => {
    dispatch(remoteCall("code?collectionId="+collectionId, "GET", "GET_CODE_REQUEST", "GET_CODE_SUCCESS",null))
}

export const addCodeCollection = (collection) => (dispatch, state) =>{
    dispatch(remoteCall("code/collection", "POST", "ADD_CODE_COLLECTION_REQUEST", "ADD_CODE_COLLECTION_SUCCESS",collection, state().account.token, function(e){
        dispatch(getCodeCollections(collection.CityCode))
    }))
}

export const updateCodeCollection = (collection) => (dispatch, state) =>{
    dispatch(remoteCall("code/collection", "PUT", "UPDATE_CODE_COLLECTION_REQUEST", "UPDATE_CODE_COLLECTION_SUCCESS",collection, state().account.token, function(e){
        dispatch(getCodeCollections(collection.CityCode))
    }))
}

export const addCode = (code) => (dispatch, state) =>{
    dispatch(remoteCall("code", "POST", "ADD_CODE_REQUEST", "ADD_CODE_SUCCESS",code, state().account.token, function(e){
        dispatch(getCode(code.CollectionId))
    }))
}

export const updateCode = (code) => (dispatch, state) =>{
    dispatch(remoteCall("code", "PUT", "UPDATE_CODE_REQUEST", "UPDATE_CODE_SUCCESS",code, state().account.token, function(e){
        dispatch(getCode(code.CollectionId))
    }))
}
