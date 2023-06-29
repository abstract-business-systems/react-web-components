import React, { useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const TimePicker = (context) => {
	const { value: initialValue, onChange = nothing }	= context;
	const initialTime = initialValue ? dayjs(`1/1/2022 ${ initialValue }`) : null;
	const [time, setTime] = useState(initialTime);

	return <LocalizationProvider dateAdapter={ AdapterDayjs }>
		<DesktopTimePicker
			value={ time }
			onChange={ (value) => {
				setTime(value);
				return onChange(buildEvent({ value }));
			} }
		/></LocalizationProvider>;
};

export default TimePicker;
