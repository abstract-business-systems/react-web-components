const schema = {
	singleSelect: {
		type: 'string',
		enum: ['India', 'Africa', 'US'],
	},
	radioGroup: {
		type: 'string',
		enum: ['India', 'Africa', 'US'],
		widget: 'radioGroup',
		disabled: false,
	},
	checkBoxGroup: {
		type: 'array',
		uniqueItems: true,
		widget: 'checkboxGroup',
		disabled: false,
		items: {
			type: 'string',
			enum: ['India', 'Africa', 'US'],
		},
		maxItems: 1,
	},
	dateTime: {
		type: 'string',
		format: 'date-time',
		title: 'DateTime',
		formatMinimum: '2000-10-06T22:22:55',
		formatMaximum: '2014-11-16T21:25:33',
	},
	multiSelect: {
		type: 'array',
		uniqueItems: true,
		readOnly: false,
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
	checkBox: {
		type: 'boolean',
		title: 'IsActive',
		widget: 'checkbox',
	},
	slider: {
		type: 'integer',
		title: 'Integer',
		maximum: 50,
		minimum: -50,
		multipleOf: 10,
		disabled: false,
		widget: 'slider',
	},
	switch: {
		type: 'boolean',
		title: 'IsActive',
		widget: 'switch',
	},
	password: {
		type: 'string',
		title: 'Password',
		minLength: 2,
		widget: 'password',
	},
	time: {
		type: 'string',
		format: 'time',
		title: 'Time',
		formatMaximum: '22:30:00',
		formatMinimum: '10:00:00',
	},
	color: {
		type: 'string',
		title: 'color',
		widget: 'color',
	},
	date: {
		type: 'string',
		format: 'date',
		title: 'Date',
		formatMinimum: '2013-11-17',
		formatMaximum: '2023-06-06',
	},
	number: {
		type: 'number',
		title: 'Amount',
		minimum: -50,
		maximum: 10,
		multipleOf: 0.2,
	},
	custom: { type: 'string' },
};

export default schema;
