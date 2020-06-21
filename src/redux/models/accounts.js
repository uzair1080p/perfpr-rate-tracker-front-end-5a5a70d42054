import _ from 'lodash';
import { APIWrapper } from '../../services/apiwrapper';
import handleError from '../handleError';
import * as Types from '../types';

export default (state = null, action) => {
  switch (action.type) {
    case Types.SET_ACCOUNTS:
      return action.data;
    case Types.UNSET_ACCOUNTS:
      return null;
    default:
      return state;
  }
}

export const accountsSelector = (state) => _.get(state, 'accounts');

export const listAccounts = () => {
  return async (dispatch, getState) => {
    try {
      const accounts = await APIWrapper.listAccounts();
      if (accounts) {
        dispatch(setAccounts(accounts));
      }
    } catch (err) { handleError(err, dispatch); }
  };
};

export const removeAccount = (accountId) => {
  return async (dispatch, getState) => {
    try {
      await APIWrapper.removeAccount(accountId);
      dispatch(listAccounts());
    } catch (err) { handleError(err, dispatch); }
  };
};

export const setAccounts = (accounts) => {
  return { type: Types.SET_ACCOUNTS, data: accounts };
};

export const unsetAccounts = () => {
  return { type: Types.UNSET_ACCOUNTS };
};