import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';

const Breadcrumbs = ({ value, ...args }) =>
	<MuiBreadcrumbs aria-label="breadcrumb" { ...args }>
		{ value.map(({ children, ...rest }, key) => {
			const last = key === (value.length - 1);

			return (
				<Link
					key={ key }
					{ ...{
						underline: 'hover',
						color: last ? 'text.primary' : 'inherit',
						...rest,
					} }
				>
					{ children }
				</Link>);
		}) }
	</MuiBreadcrumbs>;

export default Breadcrumbs;
