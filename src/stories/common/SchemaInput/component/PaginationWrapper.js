import React from 'react';
import Pagination from '../../Pagination';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../helper/buildEvent';

const maxPage = 10;

const PaginationWrapper = ({
	value, schema: { maximum = maxPage, disabled = false },
	onChange = nothing,
}) =>
	<Pagination { ...{
		page: value,
		count: maximum,
		disabled: disabled,
		onChange: (evt) =>
			onChange(buildEvent({ value: evt.target.value })),
	} }
	/>;

export default PaginationWrapper;
