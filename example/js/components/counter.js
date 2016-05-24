import React, { Component } from 'react';
import { connect } from 'react-redux';
import { localFor, bindLocalState, DEFAULT_STATE } from '../../../src/redux-local';

/**
 * @constant INITIAL_STATE
 * @type {Object}
 */
const INITIAL_STATE = {
    [DEFAULT_STATE]: 0
};

/**
 * @constant INCREMENT
 * @type {Symbol}
 */
const INCREMENT = Symbol('counter/increment');

/**
 * @constant DECREMENT
 * @type {Symbol}
 */
const DECREMENT = Symbol('counter/decrement');

/**
 * @constant RESET
 * @type {Symbol}
 */
const RESET = Symbol('counter/reset');

/**
 * @method reducer
 * @param {Object} [state = INITIAL_STATE]
 * @param {Object} action
 * @return {Object}
 */
export const reducer = (state = INITIAL_STATE, action) => {

    const { id } = action;
    const getState = bindLocalState(state);

    switch (action.type) {

        case INCREMENT:
            return { ...state, [id]: getState(id) + 1 };

        case DECREMENT:
            return { ...state, [id]: getState(id) - 1 };

        case RESET:
            return Object.keys(state).reduce((accumulator, key) => {
                return { ...accumulator, [key]: 0 };
            }, INITIAL_STATE);

    }

    return state;

};

/**
 * @method decrementAction
 * @param {Number} value
 * @return {Object}
 */
const decrementAction = value => {
    return { type: DECREMENT, value };
};

/**
 * @method incrementAction
 * @param {Number} value
 * @return {Object}
 */
const incrementAction = value => {
    return { type: INCREMENT, value };
};

/**
 * @method resetAction
 * @return {Object}
 */
export const resetAction = () => {
    return { type: RESET };
};

/**
 * @constant component
 * @type {Object}
 */
export const component = connect(state => state)(class extends Component {

    /**
     * @method shouldComponentUpdate
     * @return {Boolean}
     */
    shouldComponentUpdate(nextProps) {
        const { id } = localFor(this);
        return this.props.counter[id] !== nextProps.counter[id];
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        const { counter } = this.props;
        const { id, dispatch: localDispatch } = localFor(this);

        return (
            <div className="counter">
                <a onClick={() => localDispatch(decrementAction(1))}>
                    -
                </a>
                <var>{counter[id]}</var>
                <a onClick={() => localDispatch(incrementAction(1))}>
                    +
                </a>
            </div>
        );

    }

});
