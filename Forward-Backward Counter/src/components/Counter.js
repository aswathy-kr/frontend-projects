import useCounter from "../hooks/use-counter";

import Card from "./Card";

const Counter = (props) => {
	const counter = useCounter(props.forwards);
	return <Card>{counter}</Card>;
};

export default Counter;
