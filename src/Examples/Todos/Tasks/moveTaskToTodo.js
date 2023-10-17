
const deleteProps = {
	action: 'delete',
	entity: 'tasks',
	to: '/taskClient/',
};

const moveTaskToTodo = async (props) => {
	const data = { text: props.data.data.text, completed: false };

	const response = await props.actions.create({ ...props, data });

	response.statusText && props.actions.delete({ ...props, ...deleteProps });
};

export default moveTaskToTodo;
