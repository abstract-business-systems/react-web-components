import React from 'react';
import CssLayout from '../components/common/Layout/index';
import { Box } from '@mui/material';

const component = {
	title: 'CSS/Layout',
	component: CssLayout,
};

export default component;

const Template = ({ children }) =>
	<CssLayout>
		{ children.map((child, i) =>
			<Box
				key={ i }
			>{ child }</Box>) }
	</CssLayout>;

export const Layout = Template.bind({});

Layout.args = {
	children:
	['Hi welcome to react web components', 'B', 'C', 'D', 'E'],
};
