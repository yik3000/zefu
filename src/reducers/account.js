import { bindActionCreators } from "redux";

const defaultState = {
    //token:'"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zeXN0ZW0iOiJmMGFhMGYzYi0zNDYzLTRlYmEtMGM1ZS0wOGQ2N2UwYjhlYTMiLCJuYW1laWQiOiJmMGFhMGYzYi0zNDYzLTRlYmEtMGM1ZS0wOGQ2N2UwYjhlYTMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ6ZWZ1IiwiZXhwIjoxNTQ5MjY0NTA0LCJpc3MiOiJDb3JlSldULnZ1bGNhbi5uZXQiLCJhdWQiOiJYYW1hcmluIFJFU1RmdWwgQVBJIn0.Rzr8lI-JB1O8DOoHPtq2F72dlB6dAMyeoXUbB_SgO1U"',
    token:'',
    name:"untitled",
    services:[],
    skills:[],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
  //----------------------------------------------------------------------------------------------------				
            case 'LOGIN_SUCCESS':
                console.log(action)
                var newState = {
                    ...state,
                    name: action.res.Name,
                    token: action.res.Token
                }
                return newState;
            case 'GET_ME_SUCCESS':
                return {
                    ...state,
                    name: action.res.Name
                }
            case 'GET_MY_SERVICE_SUCCESS':
                return{
                    ...state,
                    services: action.res
                }
            case 'CLEAR_SESSION':
                  return{
                      ...state,
                      token:'',
                  }
  //----------------------------------------------------------------------------------------------------
      default:
        return {
          ...state
        }
    }
  }
  
  export default reducer