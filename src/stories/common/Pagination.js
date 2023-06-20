import * as React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import buildEvent from './helper/buildEvent';
import { nothing } from '@laufire/utils/predicates';

const Pagination = ({ onChange = nothing, ...rest }) =>
	<MuiPagination { ...{
		onChange: (evt, newValue) =>
			onChange(buildEvent({ newValue })), ...rest,
	} }
	/>;

export default Pagination;
