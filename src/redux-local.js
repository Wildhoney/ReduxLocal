import { curry } from 'ramda';
import { generate } from 'shortid';
import WeakMap from 'es6-weak-map';

/**
 * @constant map
 * @type {WeakMap}
 */
const map = new WeakMap();

/**
 * @constant DEFAULT_STATE
 * @type {Symbol}
 */
export const DEFAULT_STATE = Symbol('redux-local/default-state');

/**
 * @method dispatchFor
 * @param {*} instance
 * @return {Object}
 */
export const dispatchFor = instance => {

    return {

        /**
         * @constant id
         * @type {String|Symbol}
         */
        id: (() => {
            const record = map.get(instance);
            return record ? record.id : DEFAULT_STATE;
        })(),

        /**
         * @method localDispatch
         * @param {Object} action
         * @return {void}
         */
        localDispatch(action) {

            // Utilise the existing record or create a new.
            const { id } = map.get(instance) || (() => {
                const record = { id: generate(), instance };
                map.set(instance, record);
                return record;
            })();

            const localAction = { ...action, id };
            instance.props.dispatch(localAction);

        }

    };

};

/**
 * @method bindState
 * @param {Object} state
 * @param {Object} identifier
 * @return {*}
 */
export const bindState = curry((state, identifier) => {
    return state[identifier] || state[DEFAULT_STATE];
});
