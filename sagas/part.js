import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router'

import {
  ADD_PART_REQUEST,
  ADD_PART_SUCCESS,
  ADD_PART_FAILURE,
  EDIT_PART_REQUEST,
  EDIT_PART_SUCCESS,
  EDIT_PART_FAILURE,
  LOAD_PART_REQUEST,
  LOAD_PART_SUCCESS,
  LOAD_PART_FAILURE,
  LOAD_PARTS_REQUEST,
  LOAD_PARTS_SUCCESS,
  LOAD_PARTS_FAILURE,
  
} from '../reducers/part';

function loadPartsAPI({token}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`/parts`, config);
}

function* loadParts(action) {
  try {
    const result = yield call(loadPartsAPI, action.data);
    yield put({
      type: LOAD_PARTS_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    yield put({
      type: LOAD_PARTS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadParts() {
  yield takeLatest(LOAD_PARTS_REQUEST, loadParts);
}

function editPartAPI(data) {
  const formData = new FormData();
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.put(`/parts/${data.id}`, formData, config);
}

function* editPart(action) {
  try {
    const result = yield call(editPartAPI, action.data);
    console.log('resutl', result);
    yield put({
      type: EDIT_PART_SUCCESS,
    });
    Router.pushRoute(`/parts/${action.data.id}`)
  } catch (e) {
    yield put({
      type: EDIT_PART_FAILURE,
      error: e,
    });
  }
}

function* watchEditPart() {
  yield takeLatest(EDIT_PART_REQUEST, editPart);
}


function addPartAPI(data) {
  const formData = new FormData();
  formData.append('bookId', data.id)
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.post('/parts', formData, config);
}

function* addPart(action) {
  try {
    const result = yield call(addPartAPI, action.data);
    yield put({
      type: ADD_PART_SUCCESS,
    });
    Router.pushRoute(`/books/${action.data.id}`)
  } catch (e) {
    yield put({
      type: ADD_PART_FAILURE,
      error: e,
    });
  }
}

function* watchAddPart() {
  yield takeLatest(ADD_PART_REQUEST, addPart);
}

export default function* PartSaga() {
  yield all([
    fork(watchAddPart),
    fork(watchEditPart),
    fork(watchLoadParts),
  ]);
}
