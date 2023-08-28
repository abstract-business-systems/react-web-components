import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';
import DebuggerWithState from '../Debugger';

const Input = genWithState(InputWithState);
const Select = genWithState(SelectWithState);
const Debugger = genWithState(DebuggerWithState);

export { Input, Select, Debugger };
