const initialState = {
	toggleAll: false,
	todo: '',
	todoClient: { data: { todos: { data: {}}}},
	filterTodo: 'all',
	editing: { data: {}, status: 'add' },
	filterBar: [
		{ label: 'All', name: 'all' },
		{ label: 'Active', name: 'active' },
		{ label: 'Completed', name: 'completed' },
	],
};

export default initialState;
