import firebase from 'firebase/app';
import 'firebase/auth';

/* eslint-disable */
import { app } from './index';
/* eslint-disable */

export function createUserWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function signInWithEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function reAuth() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    let credential;

    user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
      resolve(user);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
      resolve('Logout successed!');
    }).catch((error) => {
      reject(error);
    });
  });
}

export function updateProfile(profileName, profileImg) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: profileName,
      photoURL: profileImg
    }).then(() => {
      resolve({ profileName, profileImg });
    }).catch((error) => {
      reject(error);
    });
  });
}

export function deleteProfile() {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;

    user.delete().then(() => {
      resolve('User deleted successully!');
    }).catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        reAuth()
          .then(() => {
            user.delete().then(() => resolve('User deleted successully!'));
          })
          .catch((err) => { reject(err); });
      }
    });
  });
}