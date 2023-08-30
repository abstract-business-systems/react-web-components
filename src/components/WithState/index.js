import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';
import DebuggerWithState from '../Debugger';
import ListWithState from '../List';

const Input = genWithState({ Component: InputWithState, default: '' });
const Select = genWithState({
	Component: SelectWithState, default: undefined,
	options: [],
});
const Debugger = genWithState({ Component: DebuggerWithState, default: '' });
const List = genWithState({ Component: ListWithState, default: [] });

export { Input, Select, Debugger, List };
