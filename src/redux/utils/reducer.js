import {
  START_LOADING_GLOBAL,
  START_LOADING_LOCAL,
  START_REDIRECTING,
  STOP_LOADING_GLOBAL, STOP_LOADING_LOCAL,
  STOP_REDIRECTING
} from "../actionTypes";

const initialState = {
  loadingLocal: false,
  loadingGlobal: false,
  redirectTo: null
}

export default function utilsReducer(state = initialState, action){
  switch (action.type) {
    case START_REDIRECTING:
      return {...state, redirectTo: action.route}
    case STOP_REDIRECTING:
      return {...state, redirectTo: null}
    case START_LOADING_LOCAL:
      return {...state, loadingLocal: true}
    case START_LOADING_GLOBAL:
      return {...state, loadingGlobal: true}
    case STOP_LOADING_LOCAL:
      return {...state, loadingLocal: false}
    case STOP_LOADING_GLOBAL:
      return {...state, loadingGlobal: false}
    default:
      return state;
  }
}
