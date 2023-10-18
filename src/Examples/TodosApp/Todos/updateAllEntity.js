import { map } from '@laufire/utils/collection';

const updateAllEntity = (props) => {
	map(props.current.value.data.todos.data, (value) => {
		const data = {
			...value,
			data: { ...value.data, completed: props.data },
		};

		props.actions.patch({ ...props, data });
	});
};

export default updateAllEntity;
