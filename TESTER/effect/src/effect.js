import React, { useEffect, useState } from 'react';
import axios from 'axios'

function Effect() {
	const [ url , setUrl ] = useState(null);
	const [ state, setState ] = useState(null);

	function onClick () {
		setUrl('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
	}

	useEffect(() => {
		console.log(url)

		if (url != null)
			axios.get(url).then(data => {
				setState(data)
			});
	}, [url])
	return (
		<div>
			{!state && <p>Loading ... </p>}
			{state && (<p>{state}</p>)}
			<button onClick={onClick}> Click</button>
		</div>
	)
}

export default Effect;