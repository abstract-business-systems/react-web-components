const moveTaskToTodo = (props) => {
	const data = { text: props.data.data.text, completed: false };

	props.actions.create({ ...props, data });
};

export default moveTaskToTodo;
