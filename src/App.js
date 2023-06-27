import React from 'react';
import './App.scss';
import Tab from '../src/stories/common/Tab/index';

const getTabProp = (context) => ({
	...context,
	contents: {
		Journal: {
			label: 'Journal',
			component: 'Journal',
			props: { ...{ ...context, data: { collection: 'journals' }}},
		},
		Ledger: {
			label: 'Ledger',
			component: 'Ledger',
			props: { ...{ ...context, data: { collection: 'ledgers' }}},
		},
	},
	value: 'Journal',
	style: 'textOnly',
});

const App = (context) => <div className="App">
	<Tab { ...getTabProp(context) }/>
</div>;

export default App;
