import { keys } from '@laufire/utils/collection';

const transformOptions = (sections) => (keys(sections).length
	? { '': sections }
	: sections);

export default transformOptions;
