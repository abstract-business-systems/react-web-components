import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';

const Breadcrumbs = ({ value, ...args }) =>
	<MuiBreadcrumbs aria-label="breadcrumb" { ...args }>
		{ value.map(({ href, children }, key) =>
			<Link
				key={ key }
				{ ...{ underline: 'hover', color: 'inherit', href: href } }
			>
				{ children }
			</Link>) }
	</MuiBreadcrumbs>;

export default Breadcrumbs;
