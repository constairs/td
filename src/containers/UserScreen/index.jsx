// @flow

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userUpdateRequest as userUpdate } from '../../redux/users/actions';

// claiv luwis - otmena cheloveka

const Login = ({
  userUpdateRequest
} : {
  userUpdateRequest: (credentials: Object) => any
}) => {
  const [displayName, useName] = useState('');
  const [photoURL, usePhoto] = useState('');

  return (
    <div>
      <form onSubmit={() => {
        userUpdateRequest({
          displayName,
          photoURL
        });
      }}
      >
        <label htmlFor="name">
          <span className="descr">user name</span>
          <input
            type="text"
            id="name"
            name="name"
            value={displayName}
            onChange={({ target: { value } }) => { useName(value); }}
          />
        </label>
        <label htmlFor="userImg">
          <span className="descr">User image</span>
          <input
            type="file"
            id="userImg"
            name="userImg"
            value={photoURL}
            onChange={({ target: { value } }) => { usePhoto(value); }}
          />
          {/* <img src={photoURL} alt={photoURL} /> */}
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export const LoginScreen = connect(
  () => {},
  (dispatch) => {
    bindActionCreators({ userUpdate }, dispatch);
  }
)(Login);