import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { isEmpty, isString, conformsTo, isFunction, isObject } from 'lodash';

import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from '../constants';
import createReducer from '../app.reducers';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = key =>
    invariant(
        isString(key) && !isEmpty(key),
        '(app/utils...) injectSaga: Expected `key` to be a non empty string',
    );

const checkDescriptor = descriptor => {
    const shape = {
        saga: isFunction,
        mode: mode => isString(mode) && allowedModes.includes(mode),
    };
    invariant(
        conformsTo(descriptor, shape),
        '(app/utils...) injectSaga: Expected a valid saga descriptor',
    );
};

const injectSagaFactory = (store, isValid) => {
    return (key, descriptor = {}, args) => {
        if (!isValid) checkStore(store);

        const newDescriptor = {
            ...descriptor,
            mode: descriptor.mode || RESTART_ON_REMOUNT,
        };
        const { saga, mode } = newDescriptor;

        checkKey(key);
        checkDescriptor(newDescriptor);

        let hasSaga = Reflect.has(store.injectedSagas, key);

        if (process.env.NODE_ENV !== 'production') {
            const oldDescriptor = store.injectedSagas[key];
            // enable hot reloading of daemon and once-till-unmount sagas
            if (hasSaga && oldDescriptor.saga !== saga) {
                oldDescriptor.task.cancel();
                hasSaga = false;
            }
        }

        if (
            !hasSaga ||
            (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
        ) {
            /* eslint-disable no-param-reassign */
            store.injectedSagas[key] = {
                ...newDescriptor,
                task: store.runSaga(saga, args),
            };
            /* eslint-enable no-param-reassign */
        }
    };
}

const ejectSagaFactory = (store, isValid) => {
    return (key) => {
        if (!isValid) checkStore(store);

        checkKey(key);

        if (Reflect.has(store.injectedSagas, key)) {
            const descriptor = store.injectedSagas[key];
            if (descriptor.mode && descriptor.mode !== DAEMON) {
                descriptor.task.cancel();
                // Clean up in production; in development we need `descriptor.saga` for hot reloading
                if (process.env.NODE_ENV === 'production') {
                    // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
                    store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
                }
            }
        }
    };
}

const getSagaInjectors = (store) => {
    checkStore(store);

    return {
        injectSaga: injectSagaFactory(store, true),
        ejectSaga: ejectSagaFactory(store, true),
    };
}

const checkStore = (store) => {
    /**
    * Validate the shape of redux store
    */
    const shape = {
        dispatch: isFunction,
        subscribe: isFunction,
        getState: isFunction,
        replaceReducer: isFunction,
        runSaga: isFunction,
        injectedReducers: isObject,
        injectedSagas: isObject,
    };
    invariant(
        conformsTo(store, shape),
        '(app/utils...) injectors: Expected a valid redux store',
    );
}

const injectReducerFactory = (store, isValid) => {
    return (key, reducer) => {
        if (!isValid) checkStore(store);

        invariant(
            isString(key) && !isEmpty(key) && isFunction(reducer),
            '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
        );

        // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
        if (
            Reflect.has(store.injectedReducers, key) &&
            store.injectedReducers[key] === reducer
        )
            return;

        store.injectedReducers[key] = reducer; // eslint-disable-line no-param-reassign
        store.replaceReducer(createReducer(store.injectedReducers));
    };
}

const getReducerInjectors = (store) => {
    checkStore(store);

    return {
        injectReducer: injectReducerFactory(store, true),
    };
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export const injectReducer = ({ key, reducer }) => WrappedComponent => {
    class ReducerInjector extends React.Component {
        static WrappedComponent = WrappedComponent;

        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        static displayName = `withReducer(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        componentWillMount() {
            const { injectReducer } = this.injectors;

            injectReducer(key, reducer);
        }

        injectors = getReducerInjectors(this.context.store);

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export const injectSaga = ({ key, saga, mode }) => WrappedComponent => {
    class InjectSaga extends React.Component {
        static WrappedComponent = WrappedComponent;

        static contextTypes = {
            store: PropTypes.object.isRequired,
        };

        static displayName = `withSaga(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`;

        injectors = getSagaInjectors(this.context.store);

        componentWillMount() {
            const { injectSaga } = this.injectors;

            injectSaga(key, { saga, mode }, this.props);
        }

        componentWillUnmount() {
            const { ejectSaga } = this.injectors;

            ejectSaga(key);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
};

