import _ from 'lodash';
import { APIWrapper } from '../../services/apiwrapper';
import handleError from '../handleError';
import * as Types from '../types';

export default (state = null, action) => {
  switch (action.type) {
    case Types.SET_PROCESSORS:
      return action.data;
    case Types.UNSET_PROCESSORS:
      return null;
    default:
      return state;
  }
}

export const processorsSelector = (state) => _.get(state, 'processors');

export const listProcessors = () => {
  return async (dispatch, getState) => {
    try {
      const processors = await APIWrapper.listProcessors();
      if (processors) {
        dispatch(setProcessors(processors));
      }
    } catch (err) { handleError(err, dispatch); }
  };
};

export const createProcessor = (body) => {
  return async (dispatch, getState) => {
    try {
      await APIWrapper.createProcessor(body);
    } catch (err) { handleError(err, dispatch); }
  };
};

export const removeProcessor = (processorId) => {
  return async (dispatch, getState) => {
    try {
      await APIWrapper.removeProcessor(processorId);
      dispatch(listProcessors());
    } catch (err) { handleError(err, dispatch); }
  };
};

export const setProcessors = (processors) => {
  return { type: Types.SET_PROCESSORS, data: processors };
};

export const unsetProcessors = () => {
  return { type: Types.UNSET_PROCESSORS };
};