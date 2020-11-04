# Custom React Hook

> OBJECT

1. Knownledge what is **React Hook**
2. Write custom **React Hook**
</br></br>

## What is React Hook
Traditional react components are class components. Class components have life cycle, state, props. Functional components can't acess state. This has made hard re-usable. So react hook is appeared.</br></br>**React Hook** use state with `useState()`, and perform **side effect(*calculation changing state outside function*)** with `useEffect()`.

## How to control State ([state]())

In class, use state just using `this.state` variable, and control `this.setState()`. In hook, `useState()` function. look below.

```javascript
import React, { useState } from 'react'

function HookComp() {
	const [ state, setState ] = useState({id : 0, name : 'Kim'});

	function onClick() {
		setState({...state, id : state.id + 1});
	}

	return (
		<div>
			<p>Id : {state.id}</p>
			<p>Name : {state.name}</p>
			<button onClick={onClick}>id UP</button>
		</div>
	)
}
```
Parameter of `useState()` is initial state, 
`state`(first return) is state value, `setState()`(second return) is function for changing state value.</br></br>React exec rendering when call `setState()`. If you click button, re-render for updating id number. It's important that `setState()` works **async(batch process)**.

```javascript
function HookComp() {
	/* ... */
	function onClick() {
		setState({...state, id : state.id + 1});
		setState({...state, id : state.id + 1});
	}
	/* ... */
}
```

This code want to add 2 to id value, but click button, 1 is just added to id. React exec rendering through batch process for efficency. If you want to work in one process, use `prev` with callback.

```javascript
function HookComp() {
	/* ... */
	function onClick() {
		setState(prev => ({...prev, id : prev.id + 1}))
		setState(prev => ({...prev, id : prev.id + 1}))
	}
	/* ... */
}
```

This batch process guarantees order.
</br></br>

## Control side effect ([effect]())

**Side effect** changes state outside function. For example, calling Api or setting eventlistner. like below.

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios' //This for async http requeseting

function Component({url}) {
	const [ state, setState ] = useState(null);

	useEffect(() => {
		axios.get(url).then(data => setState(data));
	}, [url])
	return (
		<div>
			{!state && <p>Loading ... </p>}
			{state && (<p>{state}</p>)}
		</div>
	)
}
```

`UseEffect()` first parameter is callback, second parameter is **dependency array**. only exec callback when dependency array is changed. if no set dependency array, exec callback everytime with re-rendering. So when prop `url` is changed, get response correctly, change state, re-render page.</br></br>Callback return function. Return function is exec before calling callback & delete component. Use it for event listner remove, like below.

```javascript
useEffect(() => {
	const eventFunc = () => "event"

	window.addEventListner("event", eventFunc))
	return () => {
		window.removeEventListner("event", eventFunc);
	}
}, []) 
/*
When defendency array is [],
callback only work time to component made,
return function only work time to component deleted.
*/
```
</br></br>


## Custom Hook

Hook name start with 'use' for readability. Let's convert above code to custom hook. Look below.

```javascript
function useCustomHook(url) {
	const [ state, setState ] = useState(null);
	useEffect(() => {
		axios.get(url).then(data => setState(data));
	}, [url]);
	return state;
}

function Component({url}) {
	const state = useCustomHook(url);
	/* ... */
}
```
</br></br>

## Rule of hook

### Rule 1. Must call hook in custom hook or functional component.

Hook is only for functional component, so it's of course. no work in other component or function.

### Rule 2. Order of calling hook is always same.

**React hook check state only with order.** So we must consist their order. Never use **'if'**, **'for(loop)'**, **function**. It make mess order of hook, like below.

```javascript
function Comp() {
	if (/* some cond */) {
		const [ s1, setS1 ] = useState(null);
	}

	for (let i = 0; i < s1; i++) {
		const [ s2, setS2 ] = useState(null);
	}

	function mess() {
		const [ s3, setS3 ] = useState(null);
	}
}
```

Above code is example of messing order of hook. React hook doesn't know when, where, how call hook.

