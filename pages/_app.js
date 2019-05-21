import { Container } from 'next/app';
// import axios from 'axios';
import * as React from 'react';
// import Router from 'next/router'

import withRedux from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';


import reducer from '../reducers';
import rootSaga from '../sagas';

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
  return store;
};

MyApp.getInitialProps = async (context) => {
  let pageProps = {}
  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx)
  }
  const isServer = !!context.req
  return { pageProps, isServer}
}

export default withRedux(configureStore)(MyApp);
