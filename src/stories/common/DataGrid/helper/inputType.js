const inputType = {
	date: () => ({
		minWidth: 200,
		editable: false,
	}),
	array: () => ({
		type: 'string',
		minWidth: 200,
		editable: false,
	}),
	dateTime: () => ({
		minWidth: 200,
		editable: false,
	}),
	string: () => ({
		type: 'string',
		editable: false,
	}),
	password: () => ({
		type: 'string',
		editable: false,
	}),
	time: () => ({
		minWidth: 150,
		editable: false,
	}),
	integer: () => ({
		type: 'string',
		editable: false,
		width: 200,
	}),
	number: () => ({
		width: 150,
		editable: false,
	}),
	phoneNo: () => ({
		type: 'string',
		width: 150,
		editable: false,
	}),
};

export default inputType;
