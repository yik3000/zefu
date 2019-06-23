const defaultState = {
    zefus:[],
    zefu:{
        UserServices:[]
    }
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
            case "GET_ZEFUS_SUCCESS":
                var newState = {
                    ...state,
                    zefus: action.res
                }
                return newState;
            case "GET_ZEFU_SUCCESS":
                return {
                    ...state,
                    zefu: action.res
                }
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer