const defaultState = {
    states:[],
    cities:[],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
            case "GET_CITY_SUCCESS":
                var newState = {
                    ...state,
                    cities : action.res
                }
                return newState;
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer