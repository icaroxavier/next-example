import {
  CLEAR_MESSAGE,
  SEND_MESSAGE,
  START_LOADING_GLOBAL,
  START_LOADING_LOCAL,
  START_REDIRECTING,
  STOP_LOADING_GLOBAL, STOP_LOADING_LOCAL,
  STOP_REDIRECTING,
  GET_CEP_INFO_REQUEST,
  GET_CEP_INFO_SUCCESS,
  GET_CIDADES_REQUEST,
  GET_CIDADES_SUCCESS,
  GET_ESTADOS_REQUEST,
  GET_ESTADOS_SUCCESS,
  DELETE_CEP_INFO,
  GET_MUNICIPIOS_REQUEST,
  GET_MUNICIPIOS_SUCCESS
} from "../actionTypes";

const initialState = {
  loadingLocal: false,
  loadingGlobal: false,
  redirectTo: null,
  messageObject: {
    title: null,
    message: null,
    type: null
  },
  estados: [],
  cidades: [],
  municipios: [],
  cepInfo: null
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
    case GET_ESTADOS_REQUEST:
      return {...state, estados: []}
    case GET_ESTADOS_SUCCESS:
      return {...state, estados: action.data}
    case GET_CIDADES_REQUEST:
      return {...state, cidades: []}
    case GET_CIDADES_SUCCESS:
      return {...state, cidades: action.data}
    case GET_CEP_INFO_REQUEST:
      return {...state, cepInfo: null}
    case GET_CEP_INFO_SUCCESS:
      return {...state, cepInfo: action.data}
    case DELETE_CEP_INFO:
      return {...state, cepInfo: null}
    case GET_MUNICIPIOS_REQUEST:
      return {...state, municipios: []}
    case GET_MUNICIPIOS_SUCCESS:
      return {...state, municipios: action.data}
    default:
      return state;
  }
}
