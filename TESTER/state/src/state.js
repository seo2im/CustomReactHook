import React, { useState } from "react"

function StateComp() {
	const [state, setState] = useState({id : 0, name : "kim"});

	function onClick() {
		setState(prev => ({...prev, id : prev.id + 1}))
		setState(prev => ({...prev, id : prev.id + 1}))
	}

	return (
		<div>
			<p>Id : {state.id}</p>
			<p>Name : {state.name}</p>
			<button onClick={onClick}>id UP</button>
		</div>
	)
}

export default StateComp;