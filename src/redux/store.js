import { createStore, /* applyMiddleware */ } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';

export const configureStore = () => {
  // const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    /* eslint-disable */
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-disable */
    // applyMiddleware(sagaMiddleware)
  );

  if (module.hot) {
    module.hot.accept('./reducers.js', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers.js');
      store.replaceReducer(nextRootReducer);
    });
  }
  // store.runSaga = sagaMiddleware.run;

  return store;
}
