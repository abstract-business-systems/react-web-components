import { useState, React } from 'react';
import Input from '../../Input';
import handleChange from '../../helper/handleChange';

const DefaultInput = (context) => {
	const [value, setValue] = useState('');
	const props = { context, setValue };

	return (
		<Input { ...{
			InputProps: { disableUnderline: true },
			variant: 'standard',
			onChange: ({ target: { value: newValue }}) =>
				handleChange(newValue, props),
			value: value,
		} }
		/>);
};

export default DefaultInput;
