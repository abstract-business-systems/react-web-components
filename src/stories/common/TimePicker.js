import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { React, useState } from 'react';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/fn';

const slotProps = ({ variant, disableUnderline }) => ({
	textField: {
		variant: variant,
		InputProps: { disableUnderline },
	},
});

const TimePicker = (context) => {
	const { params: { value: initialValue }, onChange = nothing }	= context;
	const initialTime = initialValue ? dayjs(`1/1/2022 ${ initialValue }`) : null;
	const [time, setTime] = useState(initialTime);

	return <LocalizationProvider dateAdapter={ AdapterDayjs }>
		<DesktopTimePicker
			value={ time }
			onChange={ (value) => {
				setTime(value);
				return onChange(buildEvent({ newValue: value }));
			} }
			slotProps={ slotProps(context) }
		/></LocalizationProvider>;
};

export default TimePicker;
