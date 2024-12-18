---
redirectFrom: [/es6-spread-operator-mishap.html, /es6-spread-operator-mishap/]
title: Avoiding Mishaps with the ES6 Spread Operator
date: 2017-06-24
teaser: "The ES6 spread operator can easily trip you up!"
tags:
  - JavaScript
  - ES6
  - Redux
---

If you use the [ES6 Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) to clone an object and overwrite that object's properties, be careful of the order operations! This recently tripped me up while working on the [interactive map and trip planner for the East Coast Greenway](https://github.com/EastCoastGreenwayAlliance/ecg-map), specifically implementing a [Redux reducer](http://redux.js.org/docs/basics/Reducers.html) that manages the application state relating to planning a trip along the East Coast Greenway. Here's the issue I ran into:

Say I have an object:

```js
const o1 = {
  a: 1,
  b: 1,
};
```

and my intention is to use the spread operator to clone the first object while over-writing its property `b`.

If I did this:

```js
const o2 = {
  b: 5,
  ...o1,
};
```

then the value of `o2` would be:

```json
{
  "a": 1,
  "b": 1
}
```

**Not** what I wanted or expected! The output I wanted was:

```json
{
  "a": 1,
  "b": 5
}
```

So to fix the above I would need to do:

```js
const o2 = {
  ...o1,
  b: 5,
};
```

This is because [Babel](https://babeljs.io/) converts these statements into [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) statements. Well actually Babel uses a method called `_extends()`, which uses either `Object.assign()` or a polyfill if the former is not available in the user's browser.

So in the wrong example, the code would end up being transformed to:

```js
Object.assign({ b: 5 }, o1);
```

and thus the property `b` of `o1` overwrites `{ b: 5 }` !

Where as the correct example would be transformed to:

```js
Object.assign({}, o1, { b: 5 });
```

and we'd end up with the desired output. This is because `Object.assign()` merges properties of objects from left to right, so whatever object to the right will overwrite whatever object is to the left when the two objects have a shared property.

In the context of using Redux, this is an easy mistake to make inside of reducers, for example:

```js
const defaultState = {
  someProp: "some value",
};

function myReducer(state = defaultState, action) {
  switch (action.type) {
    case MY_ACTION:
      return {
        someProp: action.value,
        ...state,
      };
    default:
      return state;
  }
}
```

In the above example, when our reducer responds to the action `MY_ACTION`, the state would not be updated! We instead need to make sure our reducer is written as follows:

```js
function myReducer(state = {}, action) {
  switch (action.type) {
    case MY_ACTION:
      return {
        ...state,
        someProp: action.value,
      };
    default:
      return state;
  }
}
```

Note that in the above example we are returning an object that has `...state` then
`someProp: action.value`, so our state is updated as we intend it to.

I encourage you to try out the examples above using the Babel website's [REPL page](https://babeljs.io/repl/).
