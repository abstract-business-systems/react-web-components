import { pretty } from '@laufire/utils/debug';
import { identity } from '@laufire/utils/fn';
import React from 'react';
import buildEvent from './common/helper/buildEvent';

const Debugger = ({ onClick = identity, ...props }) =>
	<pre onClick={ () => { onClick(buildEvent({ value: props.value })); } }>
		{ pretty(props) }
	</pre>;

export default Debugger;
