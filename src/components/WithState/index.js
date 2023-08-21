import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';

const Input = genWithState(InputWithState);
const Select = genWithState(SelectWithState);

export { Input, Select };
