import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';
import DebuggerWithState from '../Debugger';
import PermissionsWithState from '../Permissions';
import ListWithState from '../List';
import MultiSelectWithState from '../MultiSelect';

const Input = genWithState({ Component: InputWithState, default: '' });
const Select = genWithState({
	Component: SelectWithState, default: undefined,
	options: [],
});
const Debugger = genWithState({ Component: DebuggerWithState, default: '' });
const List = genWithState({ Component: ListWithState, default: [] });
const MultiSelect = genWithState({
	Component: MultiSelectWithState,
	default: [],
	options: [],
});
const Permissions = genWithState(PermissionsWithState);

export { Input, Select, Debugger, Permissions, List, MultiSelect };
