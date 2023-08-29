import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';
import DebuggerWithState from '../Debugger';
import ListWithState from '../List';

const Input = genWithState(InputWithState);
const Select = genWithState(SelectWithState);
const Debugger = genWithState(DebuggerWithState);
const List = genWithState(ListWithState);

export { Input, Select, Debugger, List };
