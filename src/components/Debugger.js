import { pretty } from '@laufire/utils/debug';
import React from 'react';

const Debugger = (props) =>
	<pre>
		{ pretty(props) }
	</pre>;

export default Debugger;
