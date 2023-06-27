import React from 'react';
import MuiTypography from '../stories/common/Typography';

const component = {
	title: 'Display/Typography',
	component: MuiTypography,
	argTypes: {
		variant: {
			control: 'select',
			options: ['h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'subtitle1',
				'subtitle2',
				'body1',
				'body2',
				'button',
				'caption',
				'overline'],
		},
	},
	args: { variant: 'h5' },
};

export default component;

const Template = (args) => <MuiTypography { ...args }/>;

export const Typography = Template.bind({});

Typography.args = {
	children:
				`If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
				Note that text overflow can only happen with block or inline-block level
				elements (the element needs to have a width in order to overflow).`,
	align: 'left',
	gutterBottom: false,
	noWrap: true,
};
