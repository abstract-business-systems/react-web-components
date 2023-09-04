import genWithState from './genWithState';
import InputWithState from '../Input';
import SelectWithState from '../Select';
import DebuggerWithState from '../Debugger';
import PermissionsWithState from '../Permissions';
import ListWithState from '../List';
import MultiSelectWithState from '../MultiSelect';
import TransformationWithState from '../Transformation';

const Input = genWithState({ Component: InputWithState, default: '' });
const Select = genWithState({
	Component: SelectWithState,
	default: undefined,
	options: [],
});
const Debugger = genWithState({ Component: DebuggerWithState, default: '' });
const List = genWithState({ Component: ListWithState, default: [] });
const MultiSelect = genWithState({
	Component: MultiSelectWithState,
	default: [],
	options: [],
});
const Permissions = genWithState({ Component: PermissionsWithState });
const Transformation = genWithState({ Component: TransformationWithState });

export {
	Input,
	Select,
	Debugger,
	Permissions,
	List,
	MultiSelect,
	Transformation,
};
