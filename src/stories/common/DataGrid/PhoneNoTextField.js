import { React, useState } from 'react';
import PhoneNo from './PhoneNo';

const PhoneNoTextField = (context) => {
	const { value: initialValue, schema, row, field } = context;
	const [phoneNo, setPhoneNo] = useState(initialValue);

	return (
		<PhoneNo { ...{
			variant: 'standard',
			InputProps: { disableUnderline: true },
			value: phoneNo,
			onChange: ({ target: { value }}) => {
				row[field] = value;

				return setPhoneNo(value);
			},
			schema: schema,
		} }
		/>);
};

export default PhoneNoTextField;
