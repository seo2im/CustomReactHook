import React from 'react'
import ReactDOM from 'react-dom'
import StateComp from "./state"

function App () {
	return (
		<div>
			<StateComp />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'));