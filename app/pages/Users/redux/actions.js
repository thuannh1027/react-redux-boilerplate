import { LOAD_USERS, LOAD_USERS_SUCCESS, LOAD_USERS_ERROR } from '../constants';

export const loadUsers = () => {
  return {
    type: LOAD_USERS,
  };
}

export const usersLoaded = (users) => {
  return {
    type: LOAD_USERS_SUCCESS,
    users
  };
}

export const usersLoadError = (error) => {
  return {
    type: LOAD_USERS_ERROR,
    error,
  };
}
