import { map } from '@laufire/utils/collection';
import updateEntity from '../../../components/RESTClient/updateEntity';

const updateAllEntity = (props) => {
	map(props.current.value.data.todos.data, (value) => {
		const data = {
			...value,
			data: { ...value.data, completed: props.data },
		};

		updateEntity({ ...props, data });
	});
};

export default updateAllEntity;
