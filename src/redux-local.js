import { curry } from 'ramda';
import { generate } from 'shortid';

/**
 * @constant map
 * @type {WeakMap}
 */
const map = new WeakMap();

/**
 * @constant id
 * @type {Symbol}
 */
const id = Symbol('redux-local/id');

/**
 * @constant DEFAULT_STATE
 * @type {Symbol}
 */
export const DEFAULT_STATE = Symbol('redux-local/default-state');

/**
 * @method dispatchFor
 * @param {*} instance
 * @param {Object} action
 * @return {Object}
 */
export const dispatchFor = curry((instance, action) => {

    // Utilise the existing record or create a new.
    const { id } = map.get(instance) || (() => {
        const record = { id: generate(), instance };
        map.set(instance, record);
        return record;
    })();

    const localAction = { ...action, id };
    instance.props.dispatch(localAction);

});

/**
 * @method idFor
 * @param {Object|String} identifier
 * @return {String|Symbol}
 */
export const idFor = identifier => {
    const record = map.get(identifier);
    return record ? record.id : DEFAULT_STATE;
};

/**
 * @method stateFor
 * @param {Object} state
 * @param {Object} identifier
 * @return {*}
 */
export const stateFor = curry((state, identifier) => {
    return state[identifier] || state[DEFAULT_STATE];
});
