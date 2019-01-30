/* globals window document */
import React from 'react';
import { hot } from 'react-hot-loader';
import { HomeScreen } from './containers/HomeScreen';

// import './assets/css/styles.css';
import './assets/scss/styles.scss';

export const Application = hot(module)(() => (
  <React.Fragment>
    <HomeScreen />
  </React.Fragment>
));
