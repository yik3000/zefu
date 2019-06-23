const defaultState = {
    offlineLogs:[],
    showOfflineBanner: false,    
    notification:[],
    notifier:'',
}

const reducer = (state = defaultState, action) => {
    // console.log("State from Reducer ==>", state)
    switch (action.type) {
  //----------------------------------------------------------------------------------------------------				
          case 'ADD_OFFLINE_LOG_ITEM':
                  return {
                      ...state,
                      offlineLogs:[...state.offlineLogs,action.message]
                  }
          case 'CLEAR_OFFLINE_LOGS':
              return {
                  ...state,
                  offlineLogs:[],
                  showOfflineBanner:false
              }
          case 'SHOW_OFFLINE_BANNER':
              return {
                  ...state,
                  showOfflineBanner:true
              }
          case 'CLEAR_NOTIFICATION':
              return {
                  ...state,
                  notifier:'',
              }
          case 'SEND_NOTIFICATION':
              return {
                  ...state,
                  notifier: action.res,
              }
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer