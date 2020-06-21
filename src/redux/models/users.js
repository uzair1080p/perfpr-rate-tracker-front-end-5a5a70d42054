import _ from 'lodash';
import { APIWrapper } from '../../services/apiwrapper';
import * as Types from '../types';

export default (state = null, action) => {
  switch (action.type) {
    case Types.SET_USER:
      return action.data;
    case Types.UNSET_USER:
      return null;
    default:
      return state;
  }
}

export const usersSelector = (state) => _.get(state, 'users');

export const loadToken = () => {
  return async (dispatch, getState) => {
    try {
      const user = await APIWrapper.loadAccessToken();
      if (user) {
        dispatch(setUser(user));
      }
    } catch (err) {}
  };
};

export const signupUser = (name, email, password) => {
  return async (dispatch, getState) => {
    const user = await APIWrapper.createUser({ name, email, password });
    if (user) {
      dispatch(setUser(user));
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch, getState) => {
    const user = await APIWrapper.login({ email, password });
    if (user) {
      dispatch(setUser(user));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      await APIWrapper.clearAccessToken();
      dispatch(unsetUser());
    } catch (err) {}
  };
};

export const setUser = (user) => {
  return { type: Types.SET_USER, data: user };
};

export const unsetUser = () => {
  return { type: Types.UNSET_USER };
};