import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import book from './book';
import user from './user';
import part from './part';

axios.defaults.baseURL = 'http://13.113.246.46';

export default function* rootSaga() {
  yield all([
    fork(user),
    fork(book),
    fork(part),
  ]);
}
