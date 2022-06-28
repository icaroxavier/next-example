import {
  CLEAR_MESSAGE,
  DELETE_CEP_INFO,
  GET_CEP_INFO_REQUEST,
  GET_CEP_INFO_SUCCESS,
  GET_CIDADES_REQUEST,
  GET_CIDADES_SUCCESS,
  GET_ESTADOS_REQUEST,
  GET_ESTADOS_SUCCESS,
  SEND_MESSAGE,
  START_LOADING_GLOBAL,
  START_LOADING_LOCAL,
  START_REDIRECTING,
  STOP_LOADING_GLOBAL,
  STOP_LOADING_LOCAL,
  STOP_REDIRECTING,
  GET_MUNICIPIOS_REQUEST,
  GET_MUNICIPIOS_SUCCESS
} from "../actionTypes";

export function startLoadingLocal(){
  return {
    type: START_LOADING_LOCAL
  }
}
export function startLoadingGlobal(){
  return {
    type: START_LOADING_GLOBAL
  }
}
export function stopLoadingLocal(){
  return {
    type: STOP_LOADING_LOCAL
  }
}
export function stopLoadingGlobal(){
  return {
    type: STOP_LOADING_GLOBAL
  }
}

export function startRedirecting(route){
  return {
    type: START_REDIRECTING,
    route
  }
}

export function stopRedirecting(){
  return {
    type: STOP_REDIRECTING
  }
}

export function sendMessage(params){
  return {
    type: SEND_MESSAGE,
    params
  }
}

export function sendErrorMessage(message){
  return {
    type: SEND_MESSAGE,
    params: { type: "error", title: "Erro", message }
  }
}

export function clearMessage(){
  return {
    type: CLEAR_MESSAGE
  }
}

export function getCepInfoRequest(params){
  return {
    type: GET_CEP_INFO_REQUEST,
    params
  }
}

export function getCepInfoSuccess(data){
  return {
    type: GET_CEP_INFO_SUCCESS,
    data
  }
}

export function deleteCepInfo(){{
  return {
    type: DELETE_CEP_INFO
  }
}}

export function getEstadosRequest(params){
  return {
    type: GET_ESTADOS_REQUEST,
    params
  }
}
export function getEstadosSuccess(data){
  return {
    type: GET_ESTADOS_SUCCESS,
    data
  }
}
export function getCidadesRequest(params){
  return {
    type: GET_CIDADES_REQUEST,
    params
  }
}
export function getCidadesSuccess(data){
  return {
    type: GET_CIDADES_SUCCESS,
    data
  }
}

export function getMunicipiosRequest(params){
  return {
    type: GET_MUNICIPIOS_REQUEST,
    params
  }
}
export function getMunicipiosSuccess(data){
  return {
    type: GET_MUNICIPIOS_SUCCESS,
    data
  }
}
