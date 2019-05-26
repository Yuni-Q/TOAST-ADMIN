import { Container } from 'next/app';
// import axios from 'axios';
import * as React from 'react';
// import Router from 'next/router'

import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import withReduxSaga from 'next-redux-saga';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';


import reducer from '../reducers';
import rootSaga from '../sagas';
import { getCookie } from '../common/cookie';
import { LOAD_USER_REQUEST } from '../reducers/user';

import AppLayout from '../components/AppLayout';

const MyApp = ({ Component, store, pageProps }) => {
  
  return (
    <Container>
      <Provider store={store}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Provider>
    </Container>
  )
}

export function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document && window.document.createElement
  );
}

const configureStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
      applyMiddleware(...middlewares),
      !options.isServer && window && window['__REDUX_DEVTOOLS_EXTENSION__'] !== 'undefined' ? window['__REDUX_DEVTOOLS_EXTENSION__']() : (f) => f,
    );
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

MyApp.getInitialProps = async (context) => {
  let token = '';
  const isServer = !!context.ctx.req
  if(isServer) {
    const decodedCookie = decodeURIComponent(context.ctx.req.headers.cookie);
    const value = 'token'
    const cookieList = decodedCookie.split(';');
    const name = value + '=';
    const cookie = cookieList
      .map((e) => e.trim())
      .find((e) => e.indexOf(name) === 0);
    token = cookie
        ? cookie.substring(name.length)
        : '';
  } else {
    token = getCookie('token');
  }
  console.log('token', token);
  context.ctx.store.dispatch({
    type: LOAD_USER_REQUEST,
      data: {
        token
      },
  });

  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx)
  }
  return { pageProps, isServer}
}

export default withRedux(configureStore)(withReduxSaga(MyApp));
