# Redux Local

> Redux helper for maintaining pseudo-local state in a single tree.

![Travis](http://img.shields.io/travis/Wildhoney/ReduxLocal.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/redux-local.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=flat-square)

* **npm:** `npm install redux-local --save`

While there are [existing alternatives](https://github.com/threepointone/redux-react-local) to managing pseudo-local state in Redux &mdash; `redux-local` adopts the following philosophies:

* Reducers should **only** exist in one place, rather than assigned to individual components;
* Be able to dictate which components are updated with `shouldComponentUpdate`;
* Provide an overt distinction between standard dispatches and pseudo-local dispatches;
* Allow actions to be written **without** pseudo-local actions in mind;

## Getting Started

By providing only a handful of functions &mdash; `localFor` and `bindLocalState` &mdash; `redux-local` doesn't complicate the managing of pseudo-local state in components.

```javascript
render() {

    const { counter } = this.props;
    const { id, dispatch: localDispatch } = localFor(this);

    return (
        <div onClick={() => localDispatch(incrementAction())}>
            {counter[id]}
        </div>
    );

}
```

In the above case `this.props.counter` holds **all** instances of pseudo-local state, and therefore to take the one that pertains to the current component we use the `id` returned from `localFor` &mdash; `localFor` also returns the `dispatch` function for dispatching a local action. By passing in `this` we uniquely identify the current component, which is mapped to a unique string &mdash; `id` &mdash; behind the scenes &mdash; unless no local actions have yet been dispatched with this component &ndash; in which case `DEFAULT_STATE` will be yielded &mdash; any subsequent invocations of `localFor(this)` will return the same `id` or `DEFAULT_STATE`.

When the user clicks on the `div` in the above example, an action will be dispatched with an appended `id` parameter with the unique identifier of the component &mdash; we simply need to take this `id` in the reducer and update the correct item in the object.

**Note:** If `id` clashes with any of your actions, you can change its name by passing in a `string` as the second argument to `localFor`: `localFor(this, 'localId');`.

```javascript
export default (state = INITIAL_STATE, action) => {

    const { id } = action;
    const getState = bindLocalState(state);

    switch (action.type) {

        case INCREMENT:
            return { ...state, [id]: getState(id) + 1 };

    }

    return state;

};
```

Reducers for managing pseudo-local state don't look much different from how you would normally write them &mdash; you could even have a `case` for managing **all** `INCREMENT` actions by simply not using the `id` from the passed action. The curried `bindLocalState` function simply accepts the current `state` and returns the slice that pertains to the `id` &mdash; if the `id` doesn't currently exist in the `state` then `DEFAULT_STATE` will be returned which allows setting up of the default state for the reducer.

```javascript
const INITIAL_STATE = {
    [DEFAULT_STATE]: 0
};
```

It's worth taking a look at how the example [`Counter`](https://github.com/Wildhoney/ReduxLocal/blob/master/example/js/components/counter.js) component works with `redux-local`, as well as [the source](https://github.com/Wildhoney/ReduxLocal/blob/master/src/redux-local.js) which is intended to be straight-forward.
