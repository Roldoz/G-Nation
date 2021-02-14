import { ERROR_PROFILE, GET_PROFILE, CLEAR_PROFILE } from "../actions/actionTypes";


const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
  };
  
  export default function(state=initialState,{type,payload}){
      
switch(type){
    case GET_PROFILE:
        return {
            ...state,
            profile:payload,
            loading:false
        };
        case ERROR_PROFILE:
            return{
                ...state,
                error: payload,
                loading :false
            };
            case CLEAR_PROFILE:
                return{
                    ...state,
                    profile: null,
                    loading : true
                };
            default : return state;
}
  }