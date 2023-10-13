import { result } from '@laufire/utils/collection';
import isPath from './isPath';
import { resolve } from '@laufire/utils/path';

const getResolveProp = ({ prop, state, path }) => (isPath(prop)
	? result(state, resolve(path, prop))
	: prop);

export default getResolveProp;
