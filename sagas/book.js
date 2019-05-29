import { all, fork, takeLatest, put, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import Router from 'next/router'

import {
  LOAD_BOOKS_FAILURE,
  LOAD_BOOKS_REQUEST,
  LOAD_BOOKS_SUCCESS,
  LOAD_BOOK_FAILURE,
  LOAD_BOOK_REQUEST,
  LOAD_BOOK_SUCCESS,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
} from '../reducers/book';

function editBookAPI(data) {
  const formData = new FormData();
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.put(`/books/${data.id}`, formData, config);
}

function* editPost(action) {
  try {
    yield call(editBookAPI, action.data);
    yield put({
      type: EDIT_BOOK_SUCCESS,
    });
    Router.pushRoute('/books')
  } catch (e) {
    yield put({
      type: EDIT_BOOK_FAILURE,
      error: e,
    });
  }
}

function* watchEditBook() {
  yield takeLatest(EDIT_BOOK_REQUEST, editPost);
}


function addBookAPI(data) {
  const formData = new FormData();
  formData.append('title', data.title)
  formData.append('content', data.content)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.post('/books', formData, config);
}

function* addPost(action) {
  try {
    yield call(addBookAPI, action.data);
    yield put({
      type: ADD_BOOK_SUCCESS,
    });
    Router.pushRoute('/books')
  } catch (e) {
    yield put({
      type: ADD_BOOK_FAILURE,
      error: e,
    });
  }
}

function* watchAddBook() {
  yield takeLatest(ADD_BOOK_REQUEST, addPost);
}

function loadBooksAPI({ token }) {
  return axios.get('/books', { headers: { Authorization: `Bearer ${token}` } });
}

function* loadBooks(action) {
  try {
    const result = yield call(loadBooksAPI, action.data);
    yield put({
      type: LOAD_BOOKS_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    yield put({
      type: LOAD_BOOKS_FAILURE,
      error: e,
    });
  }
}

function* watchLoadBooks() {
  yield takeLatest(LOAD_BOOKS_REQUEST, loadBooks);
}

function loadBookAPI({ id, token }) {
  return axios.get(`/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

function* loadBook(action) {
  try {
    const result = yield call(loadBookAPI, action.data);
    yield put({
      type: LOAD_BOOK_SUCCESS,
      data: result.data.result,
    });
  } catch (e) {
    yield put({
      type: LOAD_BOOK_FAILURE,
      error: e,
    });
  }
}

function* watchLoadBook() {
  yield takeLatest(LOAD_BOOK_REQUEST, loadBook);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadBooks),
    fork(watchLoadBook),
    fork(watchAddBook),
    fork(watchEditBook),
  ]);
}
