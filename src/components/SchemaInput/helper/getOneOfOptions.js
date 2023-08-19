import { pick } from '@laufire/utils/collection';

const getOneOfOptions = (items) => pick(items.oneOf, 'const');

export default getOneOfOptions;
