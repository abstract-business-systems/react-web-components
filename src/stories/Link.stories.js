import React from 'react';
import Link from './common/Link';
import Select from './common/Select';

export default {
	title: 'Components/Link',
	component: Link,
	argTypes: {
		children: {
			control: 'text',
			defaultValue: 'Example Link',
		},
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
			defaultValue: 'primary',
		},
		component: {
			control: 'text',
			defaultValue: 'a',
		},
		sx: {
			control: 'object',
			defaultValue: {},
		},
		underline: {
			control: 'select',
			options: ['always', 'hover', 'none'],
			defaultValue: 'none',
		},
		target: {
			control: 'select',
			options: ['_blank', '_parent', '_self', '_top'],
			defaultValue: '_blank',
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
			defaultValue: 'body1',
		},
	},
};

const Template = (args) => <Link { ...args }/>;

export const Default = Template.bind({});

Default.args = {
	href: 'https://mui.com/material-ui/react-link/',
};

export const CustomLink = Template.bind({});

const selectArgs = {
	options: ['Ten', 'Twenty', 'Thirty'],
	label: 'Number',
	variant: 'standard',
	fullWidth: true,
	helperText: 'welcome to selectBox',
	autoWidth: true,
	size: 'small',
	required: false,
	disabled: false,
	error: false,
	multiple: false,
	sx: { width: 300 },
	disableUnderline: false,
};

CustomLink.args = {
	// eslint-disable-next-line react/display-name
	component: React.forwardRef(() => <Select { ...selectArgs }/>),
	href: '/select',
};
