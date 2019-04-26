import { createSelector } from 'reselect';

const selectUsers = state => state.get('users');

const selectRouter = state => state.get('router');

const makeSelectLoading = () =>
  createSelector(selectUsers, state => state.get('isLoading'));

const makeSelectError = () =>
  createSelector(selectUsers, state => state.get('hasError'));

const makeSelectUsers = () =>
  createSelector(selectUsers, state =>
    state.get("users"),
  );

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  makeSelectUsers,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
};
