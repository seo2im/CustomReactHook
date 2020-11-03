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

## Control side effect

**Side effect** changes state outside function. For example, calling Api or setting eventlistner. like below.

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios' //This for async http requeseting

function Effect({url}) {
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

`UseEffect()` first parameter is callback, second parameter is **dependency array**. only exec callback when dependency array is changed. if no set dependency array, exec callback everytime with re-rendering. So when prop `url` is changed, get response correctly, change state, re-render page.

