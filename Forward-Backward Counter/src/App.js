import React from "react";
import { useState } from "react";
import Counter from "./components/Counter";

function App() {
	const [forwards, setForwards] = useState(true);

	const reverseCounterHandler = () => {
		setForwards((prevForwards) => !prevForwards);
		setTimeout(() => console.log(forwards));
	};
	return (
		<React.Fragment>
			<Counter forwards={forwards} />
			<Counter forwards={!forwards} />
			<button className="btn" onClick={reverseCounterHandler}>
				Reverse Counter
			</button>
		</React.Fragment>
	);
}

export default App;
