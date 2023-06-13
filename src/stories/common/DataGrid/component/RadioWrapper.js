import { useState, React } from 'react';
import RadioGroup from '../../RadioGroup';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const RadioWrapper = (context) => {
	const { schema, value: initialValue, onChange = nothing } = context;
	const [value, setValue] = useState(initialValue);

	return (
		<RadioGroup { ...{
			options: schema.enum,
			onChange: (evt) => {
				setValue(evt.target.value);
				onChange(buildEvent({ newValue: evt.target.value }));
			},
			value: value,
			schema: schema,
		} }
		/>);
};

export default RadioWrapper;
