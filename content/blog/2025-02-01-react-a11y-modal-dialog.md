---
title: "Building an Accessible Modal Dialog in React"
date: 2025-02-17
teaser: "A comprehensive tutorial on using the HTML dialog element with React to create a reusable and accessible modal dialog."
tags:
  - React
  - Accessibility
  - Dialog
  - HTML
  - CSS
  - ARIA
---

## Introduction

Much has already been written about using the HTML `<dialog>` element as the preferred method for creating an accessible _modal dialog_ (see [further reading](#further-reading) at the end of this post). Since the `<dialog>` now has a [Baseline compatibility](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility) of "widely available" (it is available and generally well supported in all major browsers since March, 2022) we should be using it (whenever possible) to improve the accessibility of modals on the web. However, when using the `<dialog>` element with React, there are technical challenges to overcome in order to ensure users reap its accessibility benefits. This post will discuss these challenges and offer suggestions for how to solve them.

The goal of this post is to walk through creating a re-usable `ModalDialog` React component that wraps the HTML `<dialog>` element for use as an accessible modal dialog.

From a high level, a consumer of our `ModalDialog` component should be able to:

- Render arbitrary content (children) within it
- Control opening and closing it
- Optionally not control it (uncontrolled)
- Handle focus management when opening and closing the modal
- Assign it an accessible name and description
- Perform any necessary clean up tasks when the Modal is closed

We won't go into depth on how to style the `ModalDialog` component as the intended purpose of this component is that it serves as a wrapper around the HTML `<dialog>` element. It is assumed that the consumer of the `ModalDialog` component will be responsible for applying styles to it, mainly to its contents. We will, however, apply default styling for its `::backdrop` pseudo element so that the surrounding page will appeared dimmed when the `ModalDialog` is shown.

## Benefits of using the HTML dialog element as a modal dialog

Using the HTML `<dialog>` element gives us a lot of accessibility features for free:

- **Focus management**: moves focus to the dialog when shown and then back to the dialog's trigger (typically a button) when closed for keyboard navigation.
- **Traps keyboard focus** within the modal and prevents keyboard interaction with the DOM outside of the `dialog` when it is shown.
- **Prevents content outside of the `dialog` from being accessed** by assistive technology such as screen reader software when it is shown.
- **Closes the dialog** when the **escape key** is pressed
- Implicitly applies the **ARIA "dialog" role**
- Implicitly sets the **ARIA `aria-modal` property to "true"**

Additionally, using the `dialog` element:

- Provides us with a **`::backdrop` pseudo element** we can style to dim the area outside of the `dialog` when it is opened.
- Uses the browser's [top-layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) so that we don't have to worry about competing z-index issues between the `dialog` and other UI components. The dialog will always be on top of other elements in the stacking order.

What this boils down to is that it saves us from having to implement these features on our own. It means there is less room for things to go wrong compared to when we implement these features on our own using JavaScript and CSS. If you've ever experienced `z-index` or focus management issues when writing a modal dialog component from scratch, fret no more! That's a real time saver and a huge weight off of our shoulders if you ask me.

It removes the need of a 3rd party library like `react-modal` and removes the need to rely on using a [React Portal](https://react.dev/reference/react-dom/createPortal). It also presents an opportunity to educate the rest of our team about accessibility features of modal dialogs and could open the door to introducing other types of accessible UI patterns.

With that all being said, there may be times when you can't use the HTML `<dialog>` element for your modal dialog needs. An example of this could be if you are remediating an existing codebase for accessibility issues and are not able to change the underlying HTML element of a modal dialog component. If this is the case I recommend looking at the ARIA Authoring Practices Guide's [Modal Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/). This pattern has been in use for quite some time now and is generally well supported by modern browsers and assistive technology. It's important to note that the native HTML `<dialog>` element's behavior can and should be used as a model to the greatest extent possible when creating custom analogs, even to the extent of deriving baseline acceptance/test criteria from native behaviors when they are being replicated.

Regardless of how you go about creating a modal dialog, it's always a good idea to test the implementation before releasing it into the wild. Manual accessibility testing using only the keyboard, various screen reader software on different devices, speech recognition software, and screen magnification are necessary to ensure what is being built meets the minimum criteria for being accessible. Ideally manual testing should be followed up with (and run in tandem with) user testing with people who use these assistive technologies daily due to their disabilities.

## Starter Boilerplate

The start of the component we will be writing is as follows:

```tsx
type ModalDialogProps = React.PropsWithChildren;

export const ModalDialog = (props: ModalDialogProps) => {
  return <dialog>{props.children}</dialog>;
};
```

I'm using TypeScript here to make it explicit what props will be passed to our `ModalDialog`. If you're not familiar with TypeScript and/or prefer vanilla JavaScript do not fret. I will do my best to explain what the code is doing. TypeScript and React are a common enough pairing at the time of this writing I felt it made sense to use TypeScript in the code examples.

## Technical Design Challenges

Let's now dive into the technical design challenges of using the HTML `<dialog>` element with React to create an accessible modal dialog. We'll cover these challenges one at a time, breaking down and building off each one. Afterward, we'll be sure to show the complete code.

If you're in a rush or feeling lazy, feel free to [skip ahead to the final code](#all-together-now).

### Syncing state between React and the dialog's open property

Modal dialogs have a very simple UI component state: they're either visible or they're hidden. As such we will leverage React's `useState` hook to control the visibility of the `ModalDialog` component. When the state change occurs React will re-render our component to either show it or hide it. If you're not familiar with how React decides when to render and re-render components then I strongly suggest you stop right here and read [Render and Commit in the official React docs](https://react.dev/learn/render-and-commit) before continuing along with this post.

Initially, we will have this state live outside of our component and pass it to it as a prop. So we'll update our `ModalDialogProps` to include an `isOpen` prop:

```tsx
type ModalDialogProps = PropsWithChildren & {
  isOpen: boolean;
};

const ModalDialog = (props: ModalDialogProps) => {
  // TODO: handle props.isOpen
  return <dialog>{props.children}</dialog>;
};
```

We then render our ModalDialog with some minimal child content such as a title and close button:

```tsx
import { useState, type PropsWithChildren } from "react";
import { ModalDialog } from "./ModalDialog";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ModalDialog isOpen={isOpen}>
        <div class="modal-contents">
          <h2>I'm a modal dialog</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </ModalDialog>
    </>
  );
};
```

Right now this code won't actually cause the Modal to be visible. We need to think about how we want to make our Modal visible when reacting to its `isOpen` prop change. According to the [HTML dialog spec](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element), to have the dialog behave as a true _modal dialog_ we need to call its `showModal()`. Note that the dialog element also has a `show()` method which will cause it to behave as a _non-modal dialog_, which is **_not_** what we want, since it will not utilize the accessibility features previously discussed in this post.

**Clarification**: a _non-modal dialog_, when opened, allows users to interact with the rest of the page and does not trap keyboard focus within it. A real world example of a _non-modal dialog_ is a cookies consent dialog that appears at the top or bottom of a web page when first visited. While it annoyingly obscures part of the page, it doesn't prevent users from interacting with content outside of the dialog. A true _modal dialog_ on the otherhand prevents users from interacting with any page content outside of the modal until it is closed, assuming it has been implemented correctly. And yes, some consent cookies dialogs use the _modal dialog_ pattern. Deciding whether to use a _modal_ or _non-modal_ dialog is an intentional design decision that depends on a number of factors that are outside the scope of this post. Many discerning makers of web content will implore you to [avoid using _modal_ dialogs altogether](https://modalzmodalzmodalz.com/), whenever possible.

Note that the HTML `<dialog>` element has an `open` property that determines whether it is visible or not. The dialog element will set its own `open` property to `true` when opened and `false` when closed. The challenge here is that we need to sync our React `isOpen` state with the `dialog`'s own `open` state to ensure our `ModalDialog` component is not buggy and works as expected.

The dialog's `open` property can be changed in a few different ways. Some of them may happen without us having to write any code at all. For example:

- when the user presses the escape key when the dialog is open
- when the user hits submit on a form with `method="dialog"` within the dialog
- calling `dialog.showModal()`
- calling `dialog.show()`
- calling `dialog.close()`
- setting `dialog.open = true / false`

Problems can occur if our React state gets out of sync with the dialog's `open` property, so we need to take some steps to make sure that these two are always synced with one another, and that we are always opening the dialog as a modal dialog and not as a non-modal dialog.

#### Solving syncing state

When working with the concept of component "state" in React, it's a best practice to treat React's state as the source of truth. Meaning, we do not want our React state competing with the dialog element's `open` property in our application logic. We only want to check the React state to determine when the dialog is visible or not.

When syncing things that are external from React we often will use an "effect", and to create an effect we reach for React's `useEffect` hook. To call the `<dialog>`'s appropriate `showModal` and `close` methods in the hook we will add a `ref` to it.

An effect to sync our React state with our dialog's `open` property could be written as follows:

```tsx
import { useRef } from "react";

const ModalDialog = ({ isOpen, children }: ModalDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // syncs the dialog's `open` property with our React `isOpen` state
  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      dialog.close();
    };
  }, [isOpen]);

  return <dialog ref={dialogRef}>{children}</dialog>;
};
```

The clean-up function that the effect returns makes sure to close the dialog when the effect is re-run. This is important when running React in "strict mode" since the effect will be run twice when the component is rendered for the first time in a development environment. [React's own docs give an example of this](https://react.dev/learn/synchronizing-with-effects#controlling-non-react-widgets).

There's one improvement we can make here. We should check that the Modal isn't already open before calling `dialog.showModal()`, as doing so [will throw a error](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal#exceptions) which could crash our React app. To prevent this error from being thrown, we will create a function called `safelyOpenModal()` that checks to make sure `dialog.open` is `false` before calling `dialog.showModal()`.

```ts
function safelyShowModal(dialog: HTMLDialogElement | null) {
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}
```

We then update our `ModalDialog`'s effect to be as follows:

```js
useEffect(() => {
  const dialog = dialogRef.current;

  if (isOpen) {
    safelyShowModal(dialog);
  } else {
    dialog.close();
  }

  return () => {
    dialog.close();
  };
}, [isOpen]);
```

Note that the `safelyShowModal` function should be defined outside of our `ModalDialog` component so that it won't need to be listed as a dependency of our effect.

### Handling close events

As mentioned previously, there are other ways our Modal can be closed when we use the dialog element with it. One way is when the user presses the Escape key on their keyboard. With our code as it currently exists, the `dialog`'s `open` property will be set to `false` but our React state won't be updated. This means our React state and dialog's `open` state will get out of sync, leading to bugs.

We also might want to add a "light dismiss" to our Modal where mouse users may click outside of it to close it. This means a user should be able to click on the `::backdrop` pseudo element to close the Modal.

Lastly, we will want to prevent the close event from propagating if our dialog is nested within another dialog. Otherwise when the nested Modal is open, closing it will close the inner Modal. Aside: I realize that nested Modals might not be the best in terms of usability, however this can happen in the wild and we want to make sure we cover all of our bases here.

#### Solving handling close events

To cover the technical requirements for handling other ways of closing our Modal we will use a second effect. First, we'll add a couple of new props to our `ModalDialog` component:

```tsx
type ModalDialogProps = PropsWithChildren & {
  /** whether the Modal is visible or hidden */
  isOpen: boolean;
  /** 1. NEW: state setting function that updates the value of `isOpen` */
  setIsOpen: (value: boolean) => void;
  /** 2. NEW: should a user be able to "light dismiss" the Modal by clicking on the backdrop */
  shouldLightDismiss?: boolean;
};
```

We added the two new props for the following reasons:

1. We need access to the state setter function that changes the `isOpen` prop's value, so we've added a required prop called `setIsOpen` for it. We'll call `setIsOpen` with a value of `false` when we need to close the Modal from an Escape key press or light dismiss.

2. The optional `shouldLightDismiss` prop determines whether our Modal should respond to a "light dismiss" by the user or not. There might be instances where we don't want to use a light dismiss so we've made it an optional feature of our Modal.

The code for our second effect is as follows:

```ts
useEffect(() => {
  const dialog = dialogRef.current;

  /** function that runs when we intercept a close event */
  function handleClose(event: Event | KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(false);
  }

  /** Handles dismissing the modal when clicking outside of it / on the ::backdrop */
  function lightDismiss(event: Event) {
    const { target } = event;
    if (target instanceof Element && target.nodeName === "DIALOG") {
      handleClose(event);
    }
  }

  /** function that runs when the user presses the Escape key when the Modal is open */
  function closeOnEscape(event: KeyboardEvent) {
    if (event.code === "Escape") {
      handleClose(event);
    }
  }

  // we add a click event listener to handle the Modal light dismiss
  if (shouldLightDismiss) {
    dialog?.addEventListener("click", lightDismiss);
  }

  // we add a keydown event listener to intercept the Escape key press
  dialog?.addEventListener("keydown", closeOnEscape);

  // our clean up function removes the event listeners to prevent memory leaks
  return () => {
    if (shouldLightDismiss) {
      dialog?.removeEventListener("click", lightDismiss);
    }
    dialog?.removeEventListener("keydown", closeOnEscape);
  };
}, [setIsOpen, shouldLightDismiss]);
```

After making these updates our Modal will now correctly respond to close events triggered by either the Escape key or light dismiss by the user. It should not have any problems being re-opened after it has been closed from either of these types of close events as well.

### Enabling the component to be controlled or uncontrolled

In React, there is the concept of ["controlled" and "uncontrolled" components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) which typically applies to form controls such as inputs. A component that is "controlled" has its behavior handled by its parent while a component that is "uncontrolled" has behavior that the parent has no influence over. This concept can be applied to our `ModalDialog` component.

Depending on where in our application we use our `ModalDialog` component, we may want it to be controlled or uncontrolled by a parent component. If we want the Modal to be a controlled component, then we need to maintain some state outside the `ModalDialog` component and pass it to the component as an `isOpen` prop to control opening and closing it, which we've already accomplished.

Other times we may want to open the `ModalDialog` component once at a specific point in time and allow for it to be closed on its own without having to create and manage any additional state. Our `ModalDialog` component should be capable of handling either case for flexibility without any loss of functionality.

#### Solving for the Controlled and UnControlled Modal

To make our Modal flexible enough to be controlled or uncontrolled, we start by giving it its own `isOpen` state and `setIsOpen` state setter via React's `useState` hook. We will also update the existing component props for `isOpen` and `setIsOpen` to be optional. Within the component we prefer `props.isOpen` and `props.setIsOpen` if they exist. If they do not exist then we fall back to our own local `isOpen` state and `setIsOpen` state setter.

To avoid confusion with the similarly named props and state, we alias `props.isOpen` as `controlledIsOpen` and `props.setIsOpen` as `controlledSetIsOpen`. We'll also name our local `isOpen` as `uncontrolledIsOpen` and our local `setIsOpen` as `uncontrolledSetIsOpen`. Finally, we reconcile the `controlled` and `uncontrolled` props and local state using the [nullish coalescing operator (`??`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing). We then refer to `isOpen` and `setIsOpen` in the rest of our Modal's internal code to further avoid referencing props and states by their aliased names. Lastly, we'll add a new boolean prop called `initialOpen` that determines if the Modal should be open by default when it is being used as a uncontrolled component.

The following code demonstrates how we rectify the `isOpen` state and state setter in a controlled or uncontrolled setting:

```tsx
type ModalDialogProps = React.PropsWithChildren & {
  /** whether the modal is open or not */
  isOpen?: boolean;
  /** state setter for our `isOpen` value */
  setIsOpen?: (value: boolean) => void;
  /** NEW: is the Modal open by default (only when uncontrolled) */
  initialOpen?: boolean;
  /** should a user be able to "light dismiss" the Modal by clicking on the backdrop */
  shouldLightDismiss?: boolean;
};

export const Modal = ({
  initialOpen = false,
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  children,
}: ModalDialogProps) => {
  /* Local isOpen state and state setter.
   * Used when the Modal is operating as an "uncontrolled" component. */
  const [uncontrolledIsOpen, uncontrolledSetIsOpen] = useState(initialOpen);

  /* Rectified isOpen state.
   * Prefer props.isOpen if provided, otherwise use local isOpen state */
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;

  /* Rectified setIsOpen state setter.
   * Prefer is props.setIsOpen is provided, otherwise use local setIsOpen state setter */
  const setIsOpen = controlledSetIsOpen ?? uncontrolledSetIsOpen;

  // NOTE: previous code omitted for brevity

  return <dialog ref={dialogRef}>{children}</dialog>;
};
```

One issue with this approach is if the consumer of our `ModalDialog` component passes only `props.isOpen` and not `props.setIsOpen`, or vice versa. This could result in the `isOpen` state getting out of sync. To prevent this we could either:

1. Throw an `Error` when one is defined and the other is not. We can do this only when the component is in a development environment (e.g. when `process.env.NODE_ENV === "development"`) .

2. Update our `ModalDialogProps` typings so that the `isOpen` and `setIsOpen` props have to both be passed or not passed at all.

I chose to go with option two. Updating the props means they could be written as follows:

```ts
type ModalDialogIsOpenProps =
  | {
      /** is the Modal open / visible. */
      isOpen: boolean;
      /** state setter function that changes the isOpen prop value. */
      setIsOpen: (value: boolean) => void;
    }
  | {
      isOpen?: never;
      setIsOpen?: never;
    };

type ModalDialogProps = React.PropsWithChildren &
  ModalDialogIsOpenProps & {
    /** should a user be able to dismiss the dialog by clicking outside of it? */
    shouldLightDismiss?: boolean;
    /** is the Modal open by default (only when uncontrolled) */
    initialOpen?: boolean;
  };
```

Now if we pass in only `isOpen` or only `setIsOpen` to our `ModalDialog` component TypeScript will complain at us. This is a helpful feature for other people on our team who will be using our component to make sure they're using it correctly.

### Preventing misuse of the dialog when forwarding a ref to it

There may be a time when some component further up the component tree needs to access the Modal's HTML `<dialog>` node, perhaps to add an event listener to it. If we're not careful, someone could misuse a ref to the dialog node and cause it to be opened as a _non-modal_ dialog by doing either `dialogRef.open = true` or `dialogRef.show()` . Needless to say, this isn't what we want our `ModalDialog` component to do. Additionally this would cause our `isOpen` React state to become out of sync with the `dialog`'s own `open` property which would cause our `ModalDialog` component to be annoyingly buggy. It would be helpful for consumers of the `ModalDialog` component to not be able to make such mistakes when passing a `ref` to it.

#### Solving the Modal's forwarded ref

First we wrap our component in React's [`forwardRef` utility function](https://react.dev/reference/react/forwardRef) which allows for the parent component to pass a `ref` to our `ModalDialog` component:

```tsx
export const ModalDialog = forwardRef<ModalDialogRef, ModalDialogProps>(
  function ModalDialogInner(
    {
      shouldLightDismiss = true,
      initialOpen = false,
      isOpen: controlledOpen,
      setIsOpen: setControlledOpen,
      children,
    },
    forwardedRef
  ) {
    // NOTE: existing code omitted for brevity
  }
);
```

**A quick note on `forwardRef`**: in React version 19 we will no longer need to use `forwardRef` to pass a `ref` to a functional component in React. We will instead be able to pass a `ref` as a prop to the component. Keep this mind if you are now using React 19.

Next we use React's `useImperativeHandle` hook to accept the _forwarded ref_ to our `ModalDialog` component as well as safely provide access to the `ModalDialog`'s internal HTML `<dialog>` element `ref`. This allows for limiting access to the dialog's behavior only to what we deem acceptable for its intended use. The functionality we expose will call our Modal's reconciled `setIsOpen` state setter when needed. We prevent manipulating the `dialog.open` property by using a method that returns the value of our Modal's `isOpen` React state since that is the source of truth of whether our Modal is visible or hidden.

Note that the HTML `<dialog>`'s `close` method accepts a single string parameter which sets the [`dialog.returnValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/returnValue). We are not replicating that behavior here since it would require extra logic for managing the `returnValue` property. Keep this in mind if you intend to use the `close` method on the forwarded `ref`.

The following code demonstrates one way of accomplishing these requirements using React's `useImperativeHandle` hook within our `ModalDialog` component.

```ts
// the Modal's internal ref that provides access to the HTML dialog DOM node
const dialogRef = useRef<HTMLDialogElement>(null);

// handles giving the ref forwarded from the parent specific properties
useImperativeHandle(
  // the ref passed in from a parent component
  forwardedRef,
  // the object returned by this anonymous function provides
  // methods that are available to the forwarded ref
  () => {
    return {
      close() {
        setIsOpen(false);
      },
      showModal() {
        setIsOpen(true);
      },
      isOpen() {
        return isOpen;
      },
      addEventListener(
        name: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) {
        dialogRef.current?.addEventListener(name, callback, options);
      },
      removeEventListener(
        name: string,
        callback: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) {
        dialogRef.current?.removeEventListener(name, callback, options);
      },
    };
  },
  [isOpen, setIsOpen]
);
```

We may type the forwarded ref as follows:

```ts
export interface ModalDialogRef
  extends Pick<
    HTMLDialogElement,
    "addEventListener" | "removeEventListener" | "close" | "showModal"
  > {
  isOpen: () => boolean;
}
```

Using the forwarded ref from a parent component is then fairly straight forward. For example, if we want to add event listeners for the dialog element's open and close events:

```tsx
import { useEffect, useRef } from "react";
import { type ModalDialogRef, Modal } from "./Modal";

const App = () => {
  const modalRef = useRef<ModalDialogRef>(null);

  useEffect(() => {
    function handleOpen() {
      console.log("I'm open!");
    }

    function handleClose() {
      console.log("I'm closed!");
    }

    modalRef.current?.addEventListener("open", handleOpen);
    modalRef.current?.addEventListener("close", handleClose);

    return () => {
      modalRef.current?.removeEventListener("open", handleOpen);
      modalRef.current?.removeEventListener("close", handleClose);
    };
  }, []);

  return (
    <ModalDialog ref={modalRef}>
      {/* additional markup omitted for brevity */}
    </ModalDialog>
  );
};
```

### Performance Consideration: Preventing Stale State and Props

In complex web applications we may use modal dialogs for enabling a user to complete arbitrary and sometimes complex tasks such as filling out a long form, uploading and maybe editing an image, adding pins to a map, etc. After completing such a task (or abandoning it) our `ModalDialog` component will be closed and the dialog's `open` property is set to `false`. When this happens only the dialog's CSS `display` property is updated to `none`. This does not unmount our `ModalDialog` component from React's component tree, nor does it remove the dialog element from the DOM. The risk here is that React will hold onto any local state, effects, etc. that our `ModalDialog`'s children are using when the Modal is closed.

If we're not careful, when re-opened, our `ModalDialog` component could present the user interface in a state that isn't accurately reflecting what the user should see, due to the stale state or props. Additionally, our app could end up unnecessarily using device memory when it doesn't need to if the `ModalDialog`'s children components are doing something complex or CPU heavy.

It would be very helpful for the consumers of our `ModalDialog` component to ensure the `ModalDialog` component is capable of cleaning up after itself when it is hidden. Or at least provide the consumer with a clear method of handling any clean up.

#### Solving preventing the Modal from holding onto stale state

There are a few different ways to handle preventing the `ModalDialog` component's children from holding onto stale state:

1. We could add an optional prop that is a callback function to run on the dialog's "close" event. This would allow the consumer of our `ModalDialog` component to run any clean up tasks like resetting state or pausing or quitting operations that may be memory intensive. One potential downside of this approach requires the consumer of our `ModalDialog` component to remember to do their clean-up work in the Modal's `props.onClose` callback function.

2. We could wrap the `ModalDialog` in a helper component, and pass it a [special `key` prop](https://react.dev/learn/rendering-lists#why-does-react-need-keys) of a different value when opened and closed to force it to unmount and remount each time it is closed and opened. When a component is unmounted, React will remove any state that is local to that component. However, force unmounting the Modal might not be desirable to do all the time. Generally it is considered more performant to let React reconcile DOM changes rather than forcing the remounting of parts of the component tree.

3. Another way to remount the Modal from the React component tree (and the dialog from the DOM) when it is closed would be by wrapping the Modal in a helper component, and adding a conditional that returns the Modal when `isOpen` is `true` and `undefined` when `isOpen` is `false`. This approach would have the same pitfalls as the previous method using the `key` prop.

Which method you choose depends on the context you are using the `ModalDialog` in as well as other factors such as whether you would like to animate the Modal's transition between its visible and hidden states. No matter how we solve this issue, **_it's extremely important to take care that we do not break focus management._** When the `ModalDialog` is closed using the keyboard, focus should return to the trigger that opened it, if one exists, or to a sensible part of the page as to not disorient or frustrate user's who are operating our page or app using the keyboard and/or assistive technology.

First we'll add a function prop for the `onClose` event to run any desired clean-up tasks when the modal is closed. This is fairly straightforward to implement and could help consumers of our Modal in certain situations.

Our `ModalDialog` component's props will now look as follows:

```ts
export type ModalDialogProps = PropsWithChildren &
  ModalDialogIsOpenProps & {
    /** should a user be able to dismiss the dialog by clicking outside of it? */
    shouldLightDismiss?: boolean;
    /** should the dialog be open by default? */
    initialOpen?: boolean;
    /** NEW: callback function to run when the dialog is closed */
    onClose?: (event?: SyntheticEvent) => void;
  };
```

To implement the on close solution, we simply pass the `props.onClose` function to the `<dialog>` element:

```tsx
export const ModalDialog = forwardRef<ModalDialogRef, ModalDialogProps>(
  function ModalDialog(
    {
      shouldLightDismiss = true,
      initialOpen = false,
      isOpen: controlledOpen,
      setIsOpen: setControlledOpen,
      onClose,
      children,
    },
    forwardedRef
  ) {
    /* previous code omitted for brevity */

    return (
      <dialog ref={dialogRef} onClose={onClose}>
        {children}
      </dialog>
    );
  }
);
```

Next we will create a wrapper component for our `ModalDialog` component called `ModalDialogOptimized` that will unmount the Modal when the `isOpen` prop is `false`. It takes the same props as our `ModalDialog` component and forwards them to it when it is rendered.

```tsx
type ModalDialogOptimizedProps = ModalDialogProps;

const ModalDialogOptimized = (props: ModalDialogOptimizedProps) => {
  if (props.isOpen) {
    return <ModalDialog {...props}>{props.children}</ModalDialog>;
  }
  return undefined;
};
```

We then use the `ModalDialogOptimized` component as follows:

```tsx
import { useState } from "react";
import { ModalDialogOptimized } from "./ModalDialogOptimized";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalDialogOptimized {...{ isOpen, setIsOpen }}>
      {/* child content omitted for brevity */}
    </ModalDialogOptimized>
  );
};
```

Remember that we may not need to use the `ModalDialogOptimized` component since generally its best to let React manage making updates to the component tree and DOM rather than forcing a component to unmount and remount. We should only reach for this enhancement if we notice the Modal's children are holding onto stale state or causing a performance problem that could be remedied by unmounting and remounting it.

Another important caveat to note about either of these enhancements is if we decide to animate the dialog's close event. We probably don't want to update the `ModalDialog` component's children or their state until the Modal is completely hidden, otherwise we might suddenly show the Modal's contents in an unexpected state prior to it being hidden which could look odd or confuse the user. I haven't had to address this issue yet, but one possible way to do so would be to use the [`transitionEnd` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event) to handle the clean up rather than `onClose`.

### Dialog Animation challenges

Animating the modal dialog on its open and close events can add a nice bit of polish that helps signify a change of context to the user. An animation could be as simple as a fade in and out, or be more complex such as a slide in from one side of the screen. That being said, it's important to keep in mind that for accessibility reasons we should disable the animation if a user has reduced motion enabled in their browser or device.

We can animate the dialog using CSS using either:

1. `animation` and `keyframes`
2. `transition`

However, animating the dialog element is currently not fully supported, nor is it without bugs across all the major browsers.

- Animating the dialog using `transition` currently lacks support on Firefox as it requires using the CSS [`@starting-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style) at-rule which Firefox does not yet support.

- Animating or transitioning the dialog close event is buggy on webkit based browsers (see [webkit bug 275184](https://bugs.webkit.org/show_bug.cgi?id=275184)). On Safari for example, the position of the dialog appears to jump when transitioning the dialog's close event which doesn't look great.

- Animating the dialog using `keyframes` and `animation` is not yet supported on Firefox either.

If animating the dialog is a requirement, I prefer using the `transition` method of fading in the dialog during its open event. I do not transition the dialog's close event to avoid the position jump bug in Safari. The CSS for using `transition` with the dialog element is also a bit less verbose than it is for using `animation` and `keyframes`.

It's also worth noting that if we want to clean up stale state in the Modal's children then we may want to use a callback function for the dialog's `onTransitionEnd` or `onAnimationEnd` events.

#### Solving animating the Modal

We can animate the Modal using the following CSS. I'll leave it up to you how you choose to add this CSS to your code, e.g. scoping it or not, using a CSS preprocessor such as Sass or PostCSS, etc.

```css
dialog {
  --backdrop-bg-color-open: rgb(0 0 0 / 75%);
  --backdrop-bg-color-closed: rgb(0 0 0 / 0%);
  --animation-duration: 150ms;
  --animation-easing: ease-in-out;
  /* NOTE: it's important that no padding exists on the dialog element so that a user cannot accidentally click on it to dismiss it; they should only be able to click the :backdrop area to do a "light dismiss". Instead, padding should be applied to one of the dialog's child elements. */
  padding: 0;
}

@media (prefers-reduced-motion: no-preference) {
  dialog {
    opacity: 0;
    transition:
      /* NOTE: use of position 0 fixes a bug in Safari where then dialog position jumps on close / fade out. However, this comes at the expense of disabling the close / fade out transition. This could be undone once the bug in Safari has been fixed. See: https://bugs.webkit.org/show_bug.cgi?id=275184 */
      position 0,
      overlay var(--animation-duration) var(--animation-easing) allow-discrete,
      opacity var(--animation-duration) var(--animation-easing),
      display var(--animation-duration) var(--animation-easing) allow-discrete;
  }
}

@media (prefers-reduced-motion: no-preference) {
  dialog[open] {
    opacity: 1;
  }
}

dialog::backdrop {
  background-color: var(--backdrop-bg-color-closed);
}

dialog[open]::backdrop {
  background-color: var(--backdrop-bg-color-open);
}

@media (prefers-reduced-motion: no-preference) {
  dialog::backdrop {
    transition:
      display var(--animation-duration) allow-discrete,
      overlay var(--animation-duration) allow-discrete,
      background-color var(--animation-duration);
  }
}

@starting-style {
  dialog[open] {
    opacity: 0;
  }
}

@starting-style {
  dialog[open]::backdrop {
    background-color: var(--backdrop-bg-color-closed);
  }
}
```

Some notes on the CSS:

- We use the CSS [`prefers-reduced-motion` feature query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) to apply the transition only when the user has not specified a reduced motion setting on their browser or device. This way we respect the user's preference to not animate the dialog's open event if they prefer to not experience animations. Animations can trigger vestibular disorders for some people such as dizziness, nausea and headaches. By respecting the user's reduced motion settting we adhere to [WCAG SC 2.3.3 Animation from Interactions (Level AAA)](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html).

- It's important that no padding exists on the dialog element so that a user cannot accidentally click on it to dismiss it; they should only be able to click the :backdrop area to do a "light dismiss". Instead, padding should be applied to one of the dialog's child elements, e.g. a content / wrapper div element.

- Use of `transition: position 0` fixes a [bug in Safari](https://bugs.webkit.org/show_bug.cgi?id=275184) where then dialog position jumps on close / fade out. However, this comes at the expense of disabling the close / fade out transition. This could be undone once the bug in Safari has been fixed.

### Providing an Accessible Name and Description to the dialog

When creating modal dialogs it's generally considered a best practice to give them at the very least an accessible name and optionally an accessible description. This helps inform users of assistive technology, such as screen readers, what the purpose of the dialog is when they open it and focus is moved to it or within it. Without an accessible name the word "dialog" may just be announced with no other helpful information.

#### Accessible Name? Accessible Description? What are you talking about?

An _accessible name_ is a property computed by the browser using the browser's [Accessibility Tree](https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree) and operating system's [Accessibility API](https://www.smashingmagazine.com/2015/03/web-accessibility-with-accessibility-api/) which assigns a machine readable name to certain elements in the DOM. These elements are typically interactive controls such as buttons, links, and inputs, but can also apply to content areas at times as well (such as our `ModalDialog` component's dialog element). Making sure that all relevant elements have a clear, and preferably unique, accessible name is one of the most important things you can do to make your product more accessible for users of assistive technology such as screen readers, so I strongly encourage doing so. If you don't do this for certain elements like form controls then you may fail the Web Content Accessibility Guidelines (WCAG) Success Criteria [4.1.2 Name, Role, Value (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html), so it is also a requirement for conforming to WCAG.

An _accessible description_ is similar in that it is also a computed property, but it is secondary to the accessible name in that it adds more information about an element. Generally speaking, accessible names should be kept short and succinct so that screen reader users do not have to listen to a lot of descriptive text when first focusing a control or arriving in an area of the page such as our Modal. Additional and/or lengthier descriptive information is often better added as the accessible description. One example of accessible descriptions are help or error messages that are associated with form fields. These text are programmatically associated with the input so that screen reader users know that a form field has an error and what that error is, or that it contains a hint for how to fill it out, such as password requirements.

To dig deeper on this topic have a look at [Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) by the W3C Web Accessibility Initiative.

#### Solving adding an accessible name and description:

There are several [ARIA attributes](https://www.w3.org/WAI/standards-guidelines/aria/) we can utilize to provide the `ModalDialog` component's dialog element with an accessible name and description.

For the dialog's accessible name we can use either the `aria-labelledby` or `aria-label` ARIA attributes. Most accessibility experts will implore you to use `aria-labelledby` as it has some advantages over `aria-label`. Since `aria-labelledby` references an existing text node in the DOM, it benefits sighted screen reader users who can see the name as well as hear it announced, creating a better user experience for them. On the other hand, the `aria-label` attribute's value is a string (text) that becomes the accessible name and is not visible to sighted users.

An additional benefit of using `aria-labelledby` is that it is more likely to be translated to different languages by auto translate services such as in Google Chrome. The `aria-label` attribute will not be, so a screen reader user who is using a different language will not hear accessible names announced in their preferred language. However, auto-translate cannot be consistently relied upon. If localization and internationalization are requirements for your product, always keep in mind that ARIA text strings must be localized just the same as visible text.

The same criteria goes for `aria-describedby`, the description is be visible to sighted screen reader users and may be auto-translated, whereas `aria-description` will not be visible to sighted screen reader users and will not be auto-translated. Additionally, the `aria-description` attribute is not as well supported across various assistive technology and devices as `aria-describedby`, so be discerning with its usage and prefer `aria-describedby` whenever possible.

So the "Too Long; Don't Read" (TL;DR, aka summary) of this is:

- For a dialog's _accessible name_ prefer `aria-labelledby` when possible and then reach for `aria-label` as a last resort.

- For a dialog's _accessible description_ prefer `aria-describedby` when possible and reach for `aria-description` as a last resort.

We add these ARIA attributes to our ModalDialog's dialog element by passing them as props:

<!-- prettier-ignore -->
```tsx
import {
  type AriaAttributes,
  type PropsWithChildren,
  forwardRef
} from "react";

type ModalDialogProps = PropsWithChildren &
  ModalDialogIsOpenProps &
  // NEW: add optional ARIA attributes for the accessible name and description
  Pick<
    AriaAttributes,
    "aria-labelledby" | "aria-label" | "aria-describedby" | "aria-description"
  > & {
    shouldLightDismiss?: boolean;
    initialOpen?: boolean;
    onClose?: () => void;
  };

const ModalDialog = forwardRef<ModalDialogRef, ModalDialogProps>(
  function(
      {
        shouldLightDismiss = true,
        initialOpen = false,
        isOpen: controlledOpen,
        setIsOpen: setControlledOpen,
        onClose,
        children,
        ...props
      },
      forwardedRef
  }) {

      // previous code omitted for brevity

      return (
        <dialog
          ref={dialogRef}
          onClose={onClose}
          aria-labelledby={props["aria-labelledby"]}
          aria-label={props["aria-label"]}
          aria-describedby={props["aria-describedby"]}
          aria-description={props["aria-description"]}
        >
          {children}
        </dialog>
      );
  }
)
```

If we prefer to be strict about making sure the `ModalDialog` component is given an accessible name, we can check the related ARIA props to assert that one (either `aria-labelledby` or `aria-label`) has a value.

Outside of the `ModalDialog` component we can create an [assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) to check that a condition is truthy, and if not throw an error with an optional message.

```ts
function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
```

We can use this type assertion utility function within our `ModalDialog` component to check that either the `aria-label` or `aria-labelledby` prop have a value. This way, if another developer is using our component and does not provide an accessible name, an error will be thrown to not-so-gently remind them to give it one. Of course this assertion could still be intentionally bypassed, for example by providing a placeholder string or nonsense, but it at least serves as a reminder to our colleagues that they should be adhereing to accessibility best practices when using the `ModalDialog` component.

```ts
// at the top of the body of our ModalDialog component,
// check that one ARIA prop for an accessible name has been provided:
assert(
  !(!props["aria-label"] && !props["aria-describedby"]),
  "ModalDialog requires an accessible name provided by either the aria-labelledby or aria-label prop"
);
```

To avoid crashing our application in production, we wrap the assertion in an `if` statement so that we only throw an error when running the app locally in a development environment. A common way of handling this is checking the `NODE_ENV` environment variable to make sure it has not been set to `"production"`, which front-end build tools will typically do when creating a production build of source code.

```ts
if (process.env.NODE_ENV !== "production") {
  assert(
    !(!props["aria-label"] && !props["aria-describedby"]),
    "ModalDialog requires an accessible name provided by either the aria-labelledby or aria-label prop"
  );
}
```

Back to giving our Modal an accessible name and description.

We will provide the `aria-labelledby` prop a string that is the `id` value of a heading element that serves as the Modal's title. Similarly, for the `aria-describedby` prop we provide a string that is the `id` value of a paragraph element describing the Modal's purpose. We leverage React's [`useId` hook](https://react.dev/reference/react/useId) to generate unique `id` attribute values for the `aria-labelledby` and `aria-describedby` attributes. This prevents accidentally using the same `id` attribute value elsewhere in our component tree (remember that HTML `id` attribute values need to be unique in order to function correctly).

**Content Writing Tip:** Be sure to not include the words "modal" or "dialog" in the accessible name or description text, since assistive tech will already announce to users that they are now within a dialog when focus moves to it after it is revealed.

```tsx
import { useId } from "react";
import { ModalDialog } from "./ModalDialog";

const App = () => {
  const accNameId = useId();
  const accDescId = useId();

  /* previous code and Modal props omitted for brevity */

  return (
    <ModalDialog aria-labelledby={accNameId} aria-describedby={accDescId}>
      <div>
        <h2 id={accNameId}>Title Here</h2>
        <p id={accDescId}>Some more descriptive text here perhaps?</p>
      </div>
    </ModalDialog>
  );
};
```

To verify that our accessible name and description are being applied to our `ModalDialog` component's dialog element, we can use the browser's developer tools to inspect the dialog's accessibility properties. All popular browsers' developer tools have such a feature (Chrome, Safari, Firefox, etc.). Here is the documentation for [Google Chrome's Accessibility tab](https://developer.chrome.com/docs/devtools/accessibility/reference#tab). I encourage you to become familiar with this part of the developer tools and to learn how to use it for accessibility related front-end work, if this is new to you.

**Pro accessibility tip**: it's good make a habit of inspecting the accessibility panel for an element to verify its accessibility properties are being correctly implemented. This is especially true when using front-end frameworks like React that abstract HTML, or when using vanilla JavaScript to manipulate the DOM. React Components are not HTML, and in my experience many React developers do not look at the DOM they are generating with React which leads to many accessibility related bugs. Making a habit of this will save you a lot of time and headache when it comes to making sure component code is accessible. It is a good first step to take prior to performing manual accessibility testing.

I've included a screenshot of the [Vivaldi web browser](https://vivaldi.com)'s accessibility panel showing that the accessible name and description have been correctly applied to the dialog. Note that Vivaldi is a Chromium based browser so the dev tools will looks similar to Chrome's.

{% image 'react-a11y-modal-dialog-accname-accdesc.png', 'A screenshot of the `ModalDialog` component rendered in the browser with the browser developer tools accessibility panel visible to the side. Within the accessibility panel fields for the accessible name and description indicate that they are populated with the appropriate text content from the Modal\'s heading and paragraph child elements.' %}

### A brief note on the dialog's focus behavior

I'm going into a little more detail on the topic of focus management with the dialog since I've seen it come up in at least two Stack Overflow questions, both of which I responded to:

- [HTML dialog focusing button element when opened](https://stackoverflow.com/questions/61797931/html-dialog-focusing-button-element-when-opened/79028606#79028606)

- [Prevent HTML dialog from grabbing focus](https://stackoverflow.com/questions/72466624/prevent-html-dialog-from-grabbing-focus/79048146#79048146)

As you can probably infer from the titles of these questions on Stack Overflow, there is some confusion around focus behavior of the HTML `<dialog>` element. This is leading people to suggest doing things that are detrimental for accessibility such as removing focus on the dialog or its children when opened.

I want to stress that it's very important to not prevent or remove focus on the dialog when it is opened. Examples of _what not to do_ include removing the dialog's focus indicator using CSS (e.g. via the despicable `outline: none;`) or by calling the dialog's or one of its child element's `blur` method after opening the dialog. If the dialog _does not_ contain any interactive children (e.g. buttons, links, inputs, etc.) then focus should go to the dialog itself when opened. If the dialog _does_ contain focusable child elements, such as a close button, then focus should go to the first focusable element in the tab order when the dialog is opened. When the dialog is closed, focus should return to the element that triggered its open event, for example a button element.

This type of behavior is referred to as "focus management" among web accessibility professionals and in the WCAG. It is an expected behavior for the dialog element and important to not disrupt or change in order to keep our `ModalDialog` component accessible. Doing so can violate various WCAG Success Criteria, such as [SC 3.2.1 On Focus (Level A)](https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html), so if you are conforming to WCAG you should keep this in mind.

If we want to appease those minimalists whom dislike the presence of focus indicators, we can use the CSS `:focus-visible` pseudo class. This will prevent the focus indicator from displaying when a user opens the dialog by clicking its trigger with a mouse or other pointer device. The `:focus-visible` pseudo class will still show the focus indicator when using the keyboard to open it which is important for users who solely rely on using their keyboard to use their computer and can't use a mouse.

So please, don't mess with the dialog's focus behavior, unless it's to actually improve the usability and accessibility of the dialog in a particular context. One way of doing this is by using the `autofocus` attribute, which I'll touch on next.

Speaking of focus indicators, if you want to dig deeper on how to design them to be more accessible I suggest reading the excellent article [A guide to designing accessible, WCAG-conformant focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/) by Sara Soueidan.

## Caveats

### Using the autofocus attribute

In my testing (see [codepen demo](https://codepen.io/clhenrick/full/yLmOmGe "https://codepen.io/clhenrick/full/yLmOmGe")) I found that using the `autofocus` attribute on the dialog element does not always result in it being focused when opened using the keyboard, depending on the browser being used. This is likely a bug in browser vendors since the dialog spec states that when the `autofocus` attribute is on the `dialog` element it should receive focus when opened rather than one of its interactive children. There is also [an open issue in the React Github repository](https://github.com/facebook/react/issues/23301 "https://github.com/facebook/react/issues/23301") on `autoFocus` not working on the `<dialog>` element when used in React.

_For this reason I recommend **avoiding using** the_ `autofocus` _attribute on the **dialog element** for the time being_.

Similarly, I've found when testing usage of the `autofocus` attribute on a dialog’s child element, it does not appear to work as expected in React. In order to place focus on a specific child element in the `ModalDialog` component, you must use a `ref` on the desired child element and call `ref.current.focus()` after the Modal is shown.

_For this reason I recommend **avoiding using** the_ `autofocus` _attribute on the dialog’s **child elements** for the time being_.

### Conflicts with other UI components that use z-index

Because the HTML `<dialog>` element uses the browser's `top-layer` to be the top most element when shown, any other component that uses the CSS `z-index` outside of the dialog will be hidden underneath of it. This holds true for UI components that use React portals. An example component that might conflict with the dialog is a toast message (which typically have their own accessibility issues, see: [A toast to an accessible toast](https://www.scottohara.me/blog/2019/07/08/a-toast-to-a11y-toasts.html)). If the toast message is created using a React portal and relies on a high CSS `z-index` value, it will always be hidden by the dialog when both are shown at the same time. However, elements rendered within the dialog that have a `z-index` value, such as tooltips, will still be visible within the dialog.

## All together now

We made it! Here is the final code for our `ModalDialog` component:

```tsx
import {
  type AriaAttributes,
  type PropsWithChildren,
  type SyntheticEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { assert } from "./utils";
import "./ModalDialog.css";

/** Typing our props this way helps prevent one being set but not the other.
 * Both props must be set or neither must be set to avoid bugs between the dialog.open property and component's isOpen state.
 */
type ModalDialogIsOpenProps =
  | {
      /** is the dialog open / visible. Set this to use ModalDialog as a controlled component. */
      isOpen: boolean;
      /** function that changes the component's isOpen state. Set this to use ModalDialog as a controlled component. */
      setIsOpen: (value: boolean) => void;
    }
  | {
      isOpen?: never;
      setIsOpen?: never;
    };

export type ModalDialogProps = PropsWithChildren &
  ModalDialogIsOpenProps &
  Pick<
    AriaAttributes,
    "aria-labelledby" | "aria-label" | "aria-describedby" | "aria-description"
  > & {
    /** should a user be able to dismiss the dialog by clicking outside of it? */
    shouldLightDismiss?: boolean;
    /** should the dialog be open by default? */
    initialOpen?: boolean;
    /** callback function to run when the dialog is closed */
    onClose?: (event?: SyntheticEvent) => void;
  };

/** The allow listed properties of the HTML dialog element exposed to the parent in a ref. We do not expose all properties (specifically dialog.show() and dialog.open) to prevent improper use of the dialog element (e.g. as a _non-modal_ dialog). */
export interface ModalDialogRef
  extends Pick<
    HTMLDialogElement,
    "addEventListener" | "removeEventListener" | "close" | "showModal"
  > {
  /** is the dialog's open property set to true
   * Intentionally makes the dialog's `open` property read-only. We DO NOT want to set the `open` attribute/property using JSX or JavaScript as it will break the modal functionality. */
  isOpen: () => boolean;
}

/** prevents calling dialog.showModal() when it is already visible, as doing so will throw an error */
function safelyOpenDialogAsModal(dialog: HTMLDialogElement | null) {
  if (dialog && !dialog.open) {
    dialog.showModal();
  }
}

/** An accessible _modal dialog_ that utilizes the HTML <dialog> element */
export const ModalDialog = forwardRef<ModalDialogRef, ModalDialogProps>(
  function (
    {
      shouldLightDismiss = true,
      initialOpen = false,
      isOpen: controlledOpen,
      setIsOpen: setControlledOpen,
      onClose,
      children,
      ...props
    },
    forwardedRef
  ) {
    if (process.env.NODE_ENV !== "production") {
      // assert that the ModalDialog has an accessible name via either the aria-labelledby (preferred) or aria-label (fallback) ARIA attribute
      assert(
        !(!props["aria-label"] && !props["aria-labelledby"]),
        'The <ModalDialog /> component must have an accessible name! Either pass "aria-labelledby" the ID attribute value of a heading that describes the Modal\'s content, or pass "aria-label" with a short description of the Modal\'s purpose.'
      );
    }

    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
    const dialogRef = useRef<HTMLDialogElement>(null);

    /** is the ModalDialog in an open / visible state */
    const isOpen = controlledOpen ?? uncontrolledOpen;
    /** updates the ModalDialog open / visible state */
    const setIsOpen = setControlledOpen ?? setUncontrolledOpen;

    /** Effect that syncs the HTML dialog element's `open` property with our `isOpen` state */
    useEffect(() => {
      const dialog = dialogRef.current;

      if (isOpen) {
        safelyOpenDialogAsModal(dialog);
      } else {
        dialog?.close();
      }

      // make sure to close the dialog on unmount
      return () => {
        dialog?.close();
      };
    }, [isOpen]);

    // Effect that handles:
    // 1. setting up a click event listener on the dialog to dismiss the modal by clicking outside of it (on its ::backdrop pseudo element).
    // 2. preventing the default event when the Escape key is pressed so that dialog.open and isOpen do not get out of sync
    useEffect(() => {
      // local variable prevents eslint error in clean up function below
      const dialog = dialogRef.current;

      function handleClose(event: Event | KeyboardEvent) {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
      }

      /** Handles dismissing the modal when clicking outside of it / on the ::backdrop */
      function lightDismiss(event: Event) {
        const { target } = event;
        if (target instanceof Element && target.nodeName === "DIALOG") {
          handleClose(event);
        }
      }

      function closeOnEscape(event: KeyboardEvent) {
        if (event.code === "Escape") {
          handleClose(event);
        }
      }

      if (shouldLightDismiss) {
        dialog?.addEventListener("click", lightDismiss);
      }

      dialog?.addEventListener("keydown", closeOnEscape);

      return () => {
        if (shouldLightDismiss) {
          dialog?.removeEventListener("click", lightDismiss);
        }
        dialog?.removeEventListener("keydown", closeOnEscape);
      };
    }, [shouldLightDismiss, setIsOpen]);

    /** sets up the "allow listed" properties for a consumer of ModalDialog so that it may attach an event listener, and/or safely open or close the ModalDialog, via a ref */
    useImperativeHandle(forwardedRef, () => {
      return {
        close() {
          setIsOpen(false);
        },
        showModal() {
          setIsOpen(true);
        },
        isOpen() {
          return isOpen;
        },
        addEventListener(
          name: string,
          callback: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) {
          dialogRef.current?.addEventListener(name, callback, options);
        },
        removeEventListener(
          name: string,
          callback: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) {
          dialogRef.current?.removeEventListener(name, callback, options);
        },
      };
    }, [isOpen, setIsOpen]);

    return (
      <dialog
        ref={dialogRef}
        onClose={onClose}
        aria-labelledby={props["aria-labelledby"]}
        aria-label={props["aria-label"]}
        aria-describedby={props["aria-describedby"]}
        aria-description={props["aria-description"]}
      >
        {children}
      </dialog>
    );
  }
);
```

You may also view and run this code by downloading or cloning the corresponding [react-a11y-modal-dialog-demo repository](https://github.com/clhenrick/react-a11y-modal-dialog-demo) on Github.

## Credits

The following folks helped inform this blog post, either directly or indirectly, so I would like to thank them here.

I would like to give a special thanks and shout out to [Aaron Mendez](https://www.linkedin.com/in/amui) for peer reviewing this blog post prior to publishing it. He clarified some crucial bits about the dialog's accessibility features and suggested using an assertion for checking the React props relating to the dialog's accessible name. Thank you Aaron!

A big thank you to [Praise Agbabiaka](https://www.linkedin.com/in/praise-agbabiaka/) from the A11Y Slack on sharing her feedback relating to focus management when cleaning up the dialog's child state in React by unmounting the dialog when not shown.

Another big thank you to my coworker [Ri Le](https://riledigital.com) about using `position 0` to prevent the Safari position jump bug when closing the dialog.

Anytime I write about something accessibility related I also need to give a shout out to the wonderful [Sara Soueidan](https://www.sarasoueidan.com) for her [Practical Accessibility course](https://practical-accessibility.today) which has taught me a ton about web accessibility and has influenced this post.

I would also like to thank [Scott O'Hara](https://www.scottohara.me), [Adrian Rosseli](https://adrianroselli.com), and [Mayank](https://mayank.co/blog) for their previous writings about the HTML dialog element which helped informed and inspired writing this post.

## Further Reading

Thanks for reading this blog post, it was a long one! I sincerely hope that it gives you a "good enough" starting point for creating an accessible and reusable modal dialog component with React. Perhaps you even learned a thing or two about web accessibility, whether specific to modal dialogs or more generally speaking. If so please feel free to let me know by dropping me a short message either via the [contact form](/contact/) on this website or a mention on [Mastodon]({{ metadata.socialLinks.get('Mastodon') }}).

If you're interested in digging in deeper, here are some articles to browse to learn more about the HTML `<dialog>` element, including its history, and accessibility related features of the modal dialog pattern.

- [The Dialog element (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [Dialog Accessibility (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility")
- [Building a dialog component (Web.dev)](https://web.dev/articles/building/a-dialog-component)
- [Animating the Dialog Element (Frontend Masters)](https://frontendmasters.com/blog/animating-dialog/)
- [Modal Dialog pattern (WAI APG)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog/)
- [Dialog element spec (WHATWG)](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
- [Top layer (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer)
- [Use the dialog element (reasonably) by Scott O'Hara](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html)
- [Accessible Modal Dialog (Github repository) by Scott O'Hara](https://github.com/scottaohara/accessible_modal_window)
- [Having an open dialog (archival post) by Scott O'Hara](https://www.scottohara.me/blog/2019/03/05/open-dialog.html)
- [Dialog Focus in Screen Readers by Adrian Roselli](https://adrianroselli.com/2020/10/dialog-focus-in-screen-readers.html)
- [Is Dialog Enough? by Mayank](https://blog.mayank.co/is-dialog-enough)
- [Providing Accessible Names and Descriptions (WAI ARIA docs)](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
