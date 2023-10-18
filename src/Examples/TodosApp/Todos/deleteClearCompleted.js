import { filter, map } from '@laufire/utils/collection';
import deleteEntity from '../../../components/RESTClient/deleteEntity';
import { filters } from './FilterTodosTransform';

const deleteClearCompleted = (props) => {
	map(filter(props.data, filters.completed), (data) => {
		deleteEntity({ ...props, data });
	});
};

export default deleteClearCompleted;
