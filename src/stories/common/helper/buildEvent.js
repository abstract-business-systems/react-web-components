
const buildEvent = ({
	isValid = true, userInput,
	newValue, status = 'success',
}) => ({
	target: {
		value: isValid ? newValue : userInput.valid,
		error: isValid ? null : { message: 'IncorrectEntry!' },
		meta: { status },
	},
});

export default buildEvent;
