import genWithState from './genWithState';
import PermissionsComponent from '../Permissions';
import TransformationComponent from '../Transformation';
import InputComponent from '../Input';
import SelectComponent from '../Select';
import DebuggerComponent from '../Debugger';
import ListComponent from '../List';
import MultiSelectComponent from '../MultiSelect';
import ButtonComponent from '../Button';
import LocationComponent from '../Location';

const Input = genWithState({ Component: InputComponent, trigger: 'onChange' });
const Select = genWithState({
	Component: SelectComponent,
	trigger: 'onChange',
});
const Debugger = genWithState({
	Component: DebuggerComponent,
	trigger: 'onChange',
});
const List = genWithState({ Component: ListComponent });
const MultiSelect = genWithState({
	Component: MultiSelectComponent,
	trigger: 'onChange',
});
const Button = genWithState({
	Component: ButtonComponent,
	trigger: 'onClick',
});
const Permissions = genWithState({ Component: PermissionsComponent });
const Transformation = genWithState({ Component: TransformationComponent });
const Location = genWithState({ Component: LocationComponent });

export {
	Input,
	Select,
	Debugger,
	Permissions,
	List,
	MultiSelect,
	Transformation,
	Button,
	Location,
};
