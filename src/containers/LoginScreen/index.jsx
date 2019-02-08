// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLoginRequest as userLogin } from '../../redux/users/actions';

const Login = ({
  userLoginRequest
}: {
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
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={({ target: { value } }) => { useEmail(value); }}
          />
        </label>
        <label htmlFor="password">
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