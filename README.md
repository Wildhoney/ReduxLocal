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

Begin by setting up the default state for the reducer using `DEFAULT_STATE`:

```javascript
const INITIAL_STATE = {
    [DEFAULT_STATE]: 0
};
```

Setup the reducer using the `id` to resolve which component dispatched the action:

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

Destructure the `id` and dispatcher for the component, and then invoke `localDispatch` with your action:

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

It's worth taking a look at how the example [`Counter`](https://github.com/Wildhoney/ReduxLocal/blob/master/example/js/components/counter.js) component works with `redux-local`, as well as [the source](https://github.com/Wildhoney/ReduxLocal/blob/master/src/redux-local.js) which is intended to be straight-forward.

### Functions

* `bindLocalState`: Is a helper function that takes the `state` and yields the state slice that pertains to the passed action by using the unique `id` property. Returns `DEFAULT_STATE` if the `id` doesn't yet exist in `state`;
* `localFor`: Takes the component instance &mdash; `this` &mdash; and yields both the unique `id` for the component &mdash; or `DEFAULT_STATE` if no local dispatches have yet occurred &mdash; and the `dispatch` function which appends the `id` to the action.

**Note:** The `localFor` function takes an optional second parameter for passing the `id` property name for the action.
