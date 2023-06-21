import React from 'react';
import Link from './common/Link';
import Typography from './common/Typography';

export default {
	title: 'Navigation/Link',
	component: Link,
	argTypes: {
		color: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'error',
				'info',
				'success',
				'warning',
			],
		},
		underline: {
			control: 'select',
			options: ['always', 'hover', 'none'],
		},
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
		},
		variant: {
			control: 'select',
			options: [
				'body1',
				'body2',
				'button',
				'caption',
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'inherit',
				'overline',
				'subtitle1',
				'subtitle2',
			],
		},
	},
};

const Template = (args) => <Link { ...args }/>;

export const Default = Template.bind({});

Default.args = {
	href: 'https://mui.com/material-ui/react-link/',
	children: 'hi',
	component: '',
	sx: {},
};

const selectArgs = { children: 'Hi' };

export const CustomLink
= {
	parameters: {
		controls: {
			exclude:
	['color', 'variant', 'underline', 'target'],
		},
	},
};
CustomLink.args = {
	// eslint-disable-next-line react/display-name
	component: React.forwardRef(() => <Typography { ...selectArgs }/>),
	href: '/select',
};
