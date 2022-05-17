import {
  START_LOADING_GLOBAL,
  START_LOADING_LOCAL,
  START_REDIRECTING,
  STOP_LOADING_GLOBAL,
  STOP_LOADING_LOCAL, STOP_REDIRECTING
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
