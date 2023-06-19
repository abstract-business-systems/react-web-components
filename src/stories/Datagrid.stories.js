import React from 'react';
import MuiDataGrid from './common/DataGrid/index';

const component = {
	title: 'Display/DataGrid',
	component: MuiDataGrid,
};

export default component;

const Template = (args) => <MuiDataGrid { ...args }/>;

export const Journal = Template.bind({});

Journal.args = {
	value: [
		{
			id: 1,
			date: '2022-07-07',
			credit: 'Equity share capital',
			debit: 'ABS HDFC',
			amount: 50000,
			document: '1',
			notes: '#565656',
			country: 'US',
			color: '#2e66a1',
			oneOf: ['US'],
			countries: [],
		},
		{
			id: 2,
			date: '2022-09-24',
			credit: 'ABS HDFC',
			debit: 'uber',
			amount: 249,
			document: 'S11669701',
			notes: '#ab5856',
			country: 'India',
			color: '#2e66a1',
			oneOf: [],
			countries: ['India'],
		},
	],
	columns: {
		width: 80,
		editable: true,
		data: {
			properties: {
				date: {
					type: 'string',
					format: 'date',
					title: 'Date',
					formatMinimum: '2013-11-17',
					formatMaximum: '2023-06-06',
				},
				credit: {
					type: 'string',
					title: 'Credit',
				},
				debit: {
					type: 'string',
					title: 'Debit',
				},
				amount: {
					type: 'number',
					title: 'Amount',
					minimum: -50,
					maximum: 10,
					multipleOf: 0.2,
				},
				document: {
					type: 'string',
					title: 'Document',
				},
				color: {
					type: 'string',
					title: 'Color',
					widget: 'color',
				},
				country: {
					type: 'string',
					enum: ['India', 'Africa', 'US'],
					widget: 'radioGroup',
					disabled: false,
				},
				countries: {
					type: 'array',
					uniqueItems: true,
					widget: 'checkboxGroup',
					disabled: true,
					items: {
						type: 'string',
						enum: ['India', 'Africa', 'US'],
					},
					maxItems: 1,
				},
				oneOf: {
					type: 'array',
					uniqueItems: true,
					readOnly: true,
					items: {
						oneOf: [
							{
								const: 'US',
								title: 'US',
							},
							{
								const: 'India',
								title: 'India',
							},
							{
								const: 'China',
								title: 'China',
							},
						],
					},
					maxItems: 2,
				},
			},
		},
		actions: [
			{
				icon: 'Edit',
				action: 'editRow',
			},
			{
				icon: 'Delete',
				action: 'deleteRow',
			},
		],
	},
	style: {
		width: '100%',
		height: 300,
	},
};

export const Ledger = Template.bind({});
Ledger.args = {
	value: [
		{
			id: 1,
			ledger: 'ABS HDFC',
			type: 'Asset',
			accountType: 'Real',
			balances: 79453.3,
			notes: '-',
			isActive: false,
			dateTime: '2018-06-12T19:30:55',
			integer: 5,
			phoneNo: '1234567890',
			time: '13:30:00',
		},
		{
			id: 2,
			ledger: 'Adayar Anandha bhavan',
			type: 'Liability',
			accountType: 'Personal',
			balances: 0,
			notes: '-',
			time: '01:30:20',
			isActive: true,
			integer: 10,
		},
	],
	columns: {
		width: 80,
		editable: true,
		data: {
			properties: {
				ledger: {
					type: 'string',
					title: 'Ledger',
				},
				type: {
					type: 'string',
					title: 'Type',
				},
				accountType: {
					type: 'string',
					title: 'AccountType',
					disabled: true,
				},
				balances: {
					type: 'number',
					title: 'Balances',
					readOnly: true,
				},
				password: {
					type: 'string',
					title: 'Password',
					minLength: 2,
					widget: 'password',
				},
				notes: {
					type: 'string',
					title: 'Notes',
				},
				isActive: {
					type: 'boolean',
					title: 'IsActive',
					widget: 'checkbox',
				},
				dateTime: {
					type: 'string',
					format: 'date-time',
					title: 'DateTime',
					formatMinimum: '2000-10-06T22:22:55',
					formatMaximum: '2014-11-16T21:25:33',
					widget: 'dateTimePicker',
				},
				time: {
					type: 'string',
					format: 'time',
					title: 'Time',
					formatMaximum: '22:30:00',
					formatMinimum: '10:00:00',
				},
				integer: {
					type: 'integer',
					title: 'Integer',
					maximum: 50,
					minimum: -50,
					multipleOf: 10,
					widget: 'slider',
					disabled: true,
				},
				phoneNo: {
					type: 'string',
					format: 'phoneNo',
					title: 'phoneNo',
				},
			},
		},
		actions: [
			{
				icon: 'Edit',
				action: 'editRow',
			},
			{
				icon: 'Delete',
				action: 'deleteRow',
			},
		],
	},
	style: {
		width: '100%',
		height: 300,
	},
};
