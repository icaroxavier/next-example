import {call, put, all, takeLatest} from 'redux-saga/effects'
import {PLACE_HOLDER} from "../actionTypes";

function* placeHolder({params}){
  return params
}



export default all([
  takeLatest(PLACE_HOLDER, placeHolder)
])
