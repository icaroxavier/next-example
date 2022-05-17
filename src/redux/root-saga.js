import { all } from 'redux-saga/effects';
import utilsSaga from './utils/saga'

export default function* rootSaga(getState) {
  yield all([
    utilsSaga
  ]);
}
