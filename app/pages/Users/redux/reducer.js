import { fromJS } from 'immutable';

import { LOAD_USERS_SUCCESS, LOAD_USERS, LOAD_USERS_ERROR } from '../constants';

const initialState = fromJS({
    isLoading: false,
    hasError: false,
    users: null
});

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS:
            return state
                .set('isLoading', true)
                .set('hasError', false)
        case LOAD_USERS_SUCCESS:
            return state
                .set('users', action.users)
                .set('isLoading', false)
        case LOAD_USERS_ERROR:
            return state
                .set('hasError', action.error)
                .set('isLoading', false);
        default:
            return state;
    }
}

export default userReducer;
