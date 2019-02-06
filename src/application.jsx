/* globals window document */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import { HomeScreen } from './containers/HomeScreen';
import { configureStore } from './redux/store';

import { rootSaga } from './redux/sagas';

import './assets/scss/styles.scss';

const store = configureStore();

store.runSaga(rootSaga);

export const Application = hot(module)(() => (
  <Provider store={store}>
    <React.Fragment>
      <HomeScreen />
    </React.Fragment>
  </Provider>
));
