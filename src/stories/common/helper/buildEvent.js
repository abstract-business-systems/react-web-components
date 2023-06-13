
const buildEvent = ({ isValid = true, userInput, newValue }) => ({
	target: {
		value: isValid ? newValue : userInput.valid,
		error: isValid ? null : { message: 'IncorrectEntry!' },
	},
});

export default buildEvent;
