import React from 'react';
import Rating from '../../Rating';
import { nothing } from '@laufire/utils/fn';
import buildEvent from '../../common/helper/buildEvent';

const RatingWrapper = ({
	value, onChange = nothing,
	schema: { maximum, disabled = false, readOnly = false },
}) =>
	<Rating { ...{
		value: value,
		max: maximum,
		disabled: disabled,
		readOnly: readOnly,
		onChange: (evt) =>
			onChange(buildEvent({ value: evt.target.value })),
	} }
	/>;

export default RatingWrapper;
