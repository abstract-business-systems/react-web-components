import React from 'react';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Link from './Link';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Breadcrumb = ({ last, navigate, path, label, ...rest }) =>
	<Link
		{ ...{
			underline: 'hover',
			color: last ? 'text.primary' : 'inherit',
			...last && { component: Typography },
			onClick: () => navigate(path),
			...rest,
		} }
	>
		{ label }
	</Link>;

const Breadcrumbs = ({ value = [], ...args }) => {
	const navigate = useNavigate();

	return <MuiBreadcrumbs aria-label="breadcrumb" { ...args }>
		{ value.map((data, key) => {
			const last = key === (value.length - 1);

			return (
				<Breadcrumb
					key={ key }
					{ ...{ ...data, last, navigate } }
				/>);
		}) }
	</MuiBreadcrumbs>;
};

export default Breadcrumbs;
