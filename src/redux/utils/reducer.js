import {
  CLEAR_MESSAGE,
  SEND_MESSAGE,
  START_LOADING_GLOBAL,
  START_LOADING_LOCAL,
  START_REDIRECTING,
  STOP_LOADING_GLOBAL, STOP_LOADING_LOCAL,
  STOP_REDIRECTING
} from "../actionTypes";

const initialState = {
  loadingLocal: false,
  loadingGlobal: false,
  redirectTo: null,
  messageObject: {
    title: null,
    message: null,
    type: null
  }
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
    case SEND_MESSAGE:
      return {
        ...state,
        messageObject: {
          title: action.params.title,
          message: action.params.message,
          type: action.params.type
        }}
    case CLEAR_MESSAGE:
      return {...state, messageObject: initialState.messageObject}
    default:
      return state;
  }
}
