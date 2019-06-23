const defaultState = {
    services:[],
    skills:[],
    categories:[],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
            case "GET_SERVICE_SUCCESS":
                var newState = {
                    ...state,
                    services: action.res
                }
                return newState;
            case 'GET_SKILLS_SUCCESS':
                return {
                    ...state,
                    skills: action.res
                }
            case 'GET_SERVICE_CATEGORY_SUCCESS':
                return {
                    ...state,
                    categories: action.res
                }
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer