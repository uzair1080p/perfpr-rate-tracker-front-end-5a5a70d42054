import { logoutUser } from './models/users';

export default (err, dispatch) => {
  switch (err.name) {
    case 'AuthenticationError':
      dispatch(logoutUser());
      break;
    default:
      break;
  }
}