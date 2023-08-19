import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';
import { Typography } from '@mui/material';
import { identity } from '@laufire/utils/fn';
import buildEvent from './common/helper/buildEvent';

// TODO: Not possible to bring menu by clicking the selector of breadcrumb.
// TODO: Navigation should be written as a wrapper for onChange function.

const Breadcrumb = ({ isLast, onChange, value, label, ...rest }) =>
	<Link
		{ ...{
			underline: 'hover',
			color: isLast ? 'text.primary' : 'inherit',
			...isLast && { component: Typography },
			onClick: () => isLast || onChange(buildEvent({ value })),
			...rest,
		} }
	>
		{ label }
	</Link>;

const Breadcrumbs = ({ value = [], onChange = identity, ...args }) =>
	<MuiBreadcrumbs aria-label="breadcrumb" { ...args }>
		{ value.map((data, key) => {
			const isLast = key === (value.length - 1);

			return (
				<Breadcrumb
					key={ key }
					{ ...{ ...data, isLast, onChange } }
				/>);
		}) }
	</MuiBreadcrumbs>;

export default Breadcrumbs;
