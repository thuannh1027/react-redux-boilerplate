import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_USERS } from '../constants';
import { usersLoaded, usersLoadError } from './actions';

import { GET_USERS_URL } from "../../../constants/api-url"

import { apiGet } from 'utils/request';

export function* getUsers() {
  try {
    const users = yield call(apiGet, GET_USERS_URL);
    yield put(usersLoaded(users));
  } catch (err) {
    yield put(usersLoadError(err.message));
  }
}

export default function* githubData() {
  yield takeLatest(LOAD_USERS, getUsers);
}
