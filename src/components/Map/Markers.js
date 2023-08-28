import { map } from '@laufire/utils/collection';
import { Map } from './Location';

const Markers = ({ locations }) => map(locations, (coordinates) =>
	Map(coordinates));

export default Markers;
