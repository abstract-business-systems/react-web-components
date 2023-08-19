const inputValidators = {
	number: (value) => (/^-?(?:0|[1-9]\d*)?(?:\.?|\.\d*)$/).test(value),
	integer: (value) => (/^(?:[0-]|-?([1-9]+[0-9]*)?)$/).test(value),
};

export default inputValidators;
