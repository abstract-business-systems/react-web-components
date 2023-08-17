import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';
import { Typography } from '@mui/material';
import { identity } from '@laufire/utils/fn';
import buildEvent from './helper/buildEvent';

const Breadcrumb = ({ isLast, onChange, value, label, ...rest }) =>
	<Link
		{ ...{
			underline: 'hover',
			color: isLast ? 'text.primary' : 'inherit',
			...isLast && { component: Typography },
			onClick: () => onChange(buildEvent({ value })),
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
