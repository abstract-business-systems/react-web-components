import * as React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';

const Pagination = ({ onChange = nothing, ...rest }) =>
	<MuiPagination { ...{
		onChange: (evt) =>
			onChange(buildEvent({ newValue: evt.target.innerText })), ...rest,
	} }
	/>;

export default Pagination;
