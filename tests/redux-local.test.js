import test from 'ava';
import { spy } from 'sinon';
import { localFor, bindLocalState, DEFAULT_STATE } from '../src/redux-local';

test('It should be able to assign an `id` to the instance;', t => {

    const firstInstance = Symbol('mock-instance');
    const secondInstance = Symbol('mock-instance');

    const { id: firstId } = localFor(firstInstance);
    t.is(firstId, localFor(firstInstance).id);

    const { id: secondId } = localFor(secondInstance);
    t.is(secondId, localFor(secondInstance).id);

});

test('It should be able to invoke the local dispatcher;', t => {

    const instance = {
        props: {
            dispatch: spy()
        }
    };

    const type = Symbol('mock-action');
    const name = 'Miss Kittens & Busters';
    const action = { type, name };

    const { dispatch: localDispatch } = localFor(instance);
    localDispatch(action);

    t.is(instance.props.dispatch.callCount, 1);
    t.true(instance.props.dispatch.calledWith({ ...action, id: localFor(instance).id }));

});

test('It should be able to modify the `id` property name;', t => {

    const instance = {
        props: {
            dispatch: spy()
        }
    };

    const type = Symbol('mock-action');
    const name = 'Miss Kittens & Busters';
    const action = { type, name };

    const { dispatch: localDispatch } = localFor(instance, 'modifiedId');
    localDispatch(action);

    t.is(instance.props.dispatch.callCount, 1);
    t.true(instance.props.dispatch.calledWith({ ...action, modifiedId: localFor(instance).id }));

});

test('It should be able to take the correct slice from the state;', t => {

    const firstInstance = { props: { dispatch: spy() }};
    const secondInstance = { props: { dispatch: spy() }};

    const { dispatch: firstLocalDispatch } = localFor(firstInstance);
    firstLocalDispatch({});

    const { dispatch: secondLocalDispatch } = localFor(secondInstance);
    secondLocalDispatch({});

    const { id: firstId } = localFor(firstInstance);
    const { id: secondId } = localFor(secondInstance);

    const state = {
        [DEFAULT_STATE]: 1,
        [firstId]: 2,
        [secondId]: 3
    };

    const firstSlice = bindLocalState(state)('unknown-slice');
    t.is(firstSlice, 1);

    const secondSlice = bindLocalState(state)(firstId);
    t.is(secondSlice, 2);

    const thirdSlice = bindLocalState(state)(secondId);
    t.is(thirdSlice, 3);

});
