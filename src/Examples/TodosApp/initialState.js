const initialState = {
	toggleAll: false,
	todo: '',
	todoClient: { data: { todos: { data: {}}}},
	filterTodo: 'all',
	editing: { data: {}, status: 'add' },
};

export default initialState;
