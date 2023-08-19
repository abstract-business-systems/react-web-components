import React, { useState } from 'react';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { nothing } from '@laufire/utils/fn';
import buildEvent from './common/helper/buildEvent';

const TimePicker = (args) => {
	const { value: initialValue, onChange = nothing }	= args;
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
