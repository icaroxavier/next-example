import {call, put, all, takeLatest} from 'redux-saga/effects'
import {GET_CEP_INFO_REQUEST, GET_MUNICIPIOS_REQUEST, GET_ESTADOS_REQUEST} from "../actionTypes";
import { sendErrorMessage, stopLoadingLocal, startLoadingLocal, getCepInfoSuccess, getEstadosSuccess, getMunicipiosSuccess } from './actions';
import * as Utils from '../../services/utils'


function compareNome(a, b){
  if ( a.nome.toLowerCase() < b.nome.toLowerCase()){
    return -1;
  }
  if ( a.nome.toLowerCase() > b.nome.toLowerCase()){
    return 1;
  }
  return 0;
}

function* getCepInfo({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getCepInfo, params)

    if(response.data?.erro === 'true'){
      yield put(sendErrorMessage("Erro ao buscar informações do CEP: " + params))
    } else {
      yield put(getCepInfoSuccess(response.data))
    }
  } catch (error) {
    yield put(sendErrorMessage("Erro ao buscar informações do CEP: " + params))
  } finally {
    yield put(stopLoadingLocal())
  }
}

function* getMunicipios({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getMunicipios, params)

    const municipios = response.data?.sort(compareNome)

    yield put(getMunicipiosSuccess(municipios))
  } catch (error) {
    yield put(sendErrorMessage("Erro ao buscar municípios"))
  } finally {
    yield put(stopLoadingLocal())
  }
}

function* getEstados({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getEstados, params)

    const estados = response.data?.sort(compareNome)

    yield put(getEstadosSuccess(estados))
  } catch (error) {
    yield put(sendErrorMessage("Erro ao buscar Estados"))
  } finally {
    yield put(stopLoadingLocal())
  }
}



export default all([
  takeLatest(GET_CEP_INFO_REQUEST, getCepInfo),
  takeLatest(GET_MUNICIPIOS_REQUEST, getMunicipios),
  takeLatest(GET_ESTADOS_REQUEST, getEstados)
])
