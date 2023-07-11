import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';

const Pagination = ({ value, onChange = nothing, ...rest }) =>
	<MuiPagination { ...{
		page: value,
		onChange: (evt) =>
			onChange(buildEvent({ value: Number(evt.target.innerText) })),
		...rest,
	} }
	/>;

export default Pagination;
