const getInputProps = (schema) => {
	const { readOnly = false, disabled = false } = schema;

	return {
		disableUnderline: true,
		variant: 'standard',
		sx: { width: '150px' },
		inputProps: { readOnly, disabled },
	};
};

export default getInputProps;
