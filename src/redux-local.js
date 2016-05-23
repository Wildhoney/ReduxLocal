import { curry } from 'lambda';

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
 * @method typeFor
 * @param {*} instance
 * @param {*} type
 * @return {Object}
 */
export const typeFor = curry((instance, type) => {

    const record = {
        id: Symbol('redux-local/action'),
        type
    };

    map.set(instance, record);
    return record;

});

/**
 * @method idFor
 * @param {Object} action
 * @return {void}
 */
export const idFor = action => {

};

/**
 * @method local
 * @param next {Function}
 * @return {Function}
 */
export const local = next => {

    return action => {
        const { type, ...rest } = action;
        next({ type, ...rest });
    };

};

// dispatch({ type: typeFor(this, 'increment-counter'), counter: props.counter + 1 });
//
// const action = {
//     type: 'increment-counter',
//     [Symbol('instance')]: Symbol('x'),
//     counter: 3
// };