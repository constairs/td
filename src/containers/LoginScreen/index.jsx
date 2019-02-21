// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLoginRequest as userLogin } from '../../redux/users/actions';

// claiv luwis - otmena cheloveka

const Login = ({
  userLoginRequest
} : {
  userLoginRequest: (credentials: Object) => any
}) => {
  const [email, useEmail] = useState('');
  const [password, usePassword] = useState('');

  return (
    <div>
      <form onSubmit={() => {
        userLoginRequest({
          email,
          password
        });
      }}
      >
        <label htmlFor="email">
          <span className="descr">Email</span>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={({ target: { value } }) => { useEmail(value); }}
          />
        </label>
        <label htmlFor="password">
          <span className="descr">Password</span>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={({ target: { value } }) => { usePassword(value); }}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export const LoginScreen = connect(
  () => {},
  (dispatch) => {
    bindActionCreators({ userLogin }, dispatch);
  }
)(Login);
