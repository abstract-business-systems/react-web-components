import * as React from 'react';
import SchemaInputComponent from './common/SchemaInput';
import schema from './schema';
import { peek } from '@laufire/utils/debug';

const defaultValue = {
	singleSelect: 'US',
	radioGroup: 'India',
	checkBoxGroup: ['US'],
	multiSelect: ['US'],
	checkBox: false,
	slider: 10,
	password: 'hai',
	dateTime: '2018-06-12T19:30:55',
	color: '#523658',
	time: '13:30:00',
	date: '2022-07-07',
	number: 10,
	switch: false,
	custom: '',
};

const component = {
	title: 'Inputs/SchemaInput',
	component: SchemaInputComponent,
	argTypes: {
		schemaType: {
			type: 'select',
			options: [
				'singleSelect',
				'radioGroup',
				'checkBoxGroup',
				'dateTime',
				'multiSelect',
				'checkBox',
				'slider',
				'password',
				'color',
				'time',
				'date',
				'number',
				'switch',
				'custom',
			],
		},
		schema: {
			control: { type: 'object', value: schema.custom },
			if: { arg: 'schemaType', eq: 'custom' },
		},
		value: {
			control: { type: 'object', value: defaultValue.custom },
			if: { arg: 'schemaType', eq: 'custom' },
		},
	},
	args: { schemaType: 'date' },
};

export default component;

const Template = (args) => {
	const { schemaType, value: newValue } = args;
	const jsonSchema = schema[schemaType];
	const value = defaultValue[schemaType] || newValue;

	return (
		<SchemaInputComponent { ...{
			schema: jsonSchema,
			value: value,
			onChange: (evt) => peek(evt),
			...(schemaType === 'custom') && args,
		} }
		/>);
};

export const SchemaInput = Template.bind({});

SchemaInput.args = {};
