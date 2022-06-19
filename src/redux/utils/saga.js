import {call, put, all, takeLatest} from 'redux-saga/effects'
import {GET_CEP_INFO_REQUEST, GET_CIDADES_REQUEST, GET_ESTADOS_REQUEST} from "../actionTypes";
import { sendErrorMessage, stopLoadingLocal, startLoadingLocal, getCepInfoSuccess, getEstadosSuccess, getCidadesSuccess } from './actions';
import * as Utils from '../../services/utils'

function* getCepInfo({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getCepInfo, params)

    if(response.data.erro === 'true'){
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

function* getCidades({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getMunicipios, params)

    yield put(getCidadesSuccess(response.data))
  } catch (error) {
    yield put(sendErrorMessage("Erro ao buscar cidades"))
  } finally {
    yield put(stopLoadingLocal())
  }
}

function* getEstados({ params }){
  try {
    yield put(startLoadingLocal())

    const response = yield call(Utils.getEstados, params)

    yield put(getEstadosSuccess(response.data))
  } catch (error) {
    yield put(sendErrorMessage("Erro ao buscar Estados"))
  } finally {
    yield put(stopLoadingLocal())
  }
}



export default all([
  takeLatest(GET_CEP_INFO_REQUEST, getCepInfo),
  takeLatest(GET_CIDADES_REQUEST, getCidades),
  takeLatest(GET_ESTADOS_REQUEST, getEstados)
])
