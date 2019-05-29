import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router'

import {
  ADD_QUESTION_REQUEST,
  ADD_QUESTION_SUCCESS,
  ADD_QUESTION_FAILURE,
  EDIT_QUESTION_REQUEST,
  EDIT_QUESTION_SUCCESS,
  EDIT_QUESTION_FAILURE,
  LOAD_QUESTION_REQUEST,
  LOAD_QUESTION_SUCCESS,
  LOAD_QUESTION_FAILURE,
  LOAD_QUESTIONS_REQUEST,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  
} from '../reducers/question';

function loadQuestionAPI({token, id}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`admin/questions/${id}`, config);
}

function* loadQuestion(action) {
  try {
    const result = yield call(loadQuestionAPI, action.data);
    yield put({
      type: LOAD_QUESTION_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    yield put({
      type: LOAD_QUESTION_FAILURE,
      error: e,
    });
  }
}

function* watchLoadQuestion() {
  yield takeLatest(LOAD_QUESTION_REQUEST, loadQuestion);
}

function loadQuesionsAPI({token}) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`/questions`, config);
}

function* loadQuesions(action) {
  try {
    const result = yield call(loadQuesionsAPI, action.data);
    yield put({
      type: LOAD_QUESTIONS_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    yield put({
      type: LOAD_QUESTIONS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadQuestions() {
  yield takeLatest(LOAD_QUESTIONS_REQUEST, loadQuesions);
}

function editQuestionAPI(data) {
  const formData = new FormData();
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multiQUESTION/form-data'
    }
  }
  return axios.put(`/questions/${data.id}`, formData, config);
}

function* editQuestion(action) {
  try {
    yield call(editQuestionAPI, action.data);
    yield put({
      type: EDIT_QUESTION_SUCCESS,
    });
    Router.pushRoute(window.location.pathname.split('/questions')[0])
  } catch (e) {
    yield put({
      type: EDIT_QUESTION_FAILURE,
      error: e,
    });
  }
}

function* watchEditQuestion() {
  yield takeLatest(EDIT_QUESTION_REQUEST, editQuestion);
}


function addQuestionAPI(data) {
  const formData = new FormData();
  formData.append('partId', data.id)
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.post('/questions', formData, config);
}

function* addQuestion(action) {
  try {
    yield call(addQuestionAPI, action.data);
    yield put({
      type: ADD_QUESTION_SUCCESS,
    });
    Router.pushRoute(window.location.pathname.split('/addQuestion')[0])
  } catch (e) {
    yield put({
      type: ADD_QUESTION_FAILURE,
      error: e,
    });
  }
}

function* watchAddQuestion() {
  yield takeLatest(ADD_QUESTION_REQUEST, addQuestion);
}

export default function* QUESTIONSaga() {
  yield all([
    fork(watchAddQuestion),
    fork(watchEditQuestion),
    fork(watchLoadQuestions),
    fork(watchLoadQuestion),
  ]);
}
