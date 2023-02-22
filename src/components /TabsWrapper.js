import Tabs from '../stories/Tabs';
import * as React from 'react';

const TabWrapper = (context) =>
	<Tabs { ...{ ...context,
		props: {
			orientation: 'vertical',
			color: 'secondary', variant: 'scrollable',
			data: [
				{
					label: 'TodoPane',
					component: 'item1',
				},
				{
					label: 'TaskPane',
					component: 'item2',
				},
			],
		}} }
	/>;

export default TabWrapper;
