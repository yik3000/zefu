const defaultState = {
    codes:[],
    collections:[],
    activeCode:{}
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
            case "GET_CODE_COLLECTION_REQUEST":
                    return {
                    ...state,
                    collections:[]
                }
            case "GET_CODE_COLLECTION_SUCCESS":
                var newState = {
                    ...state,
                    collections: action.res
                }
                return newState;
            case "GET_CODE_SUCCESS":
                return {
                    ...state,
                    codes:action.res
                }
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer