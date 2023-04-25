const seed = {
	loading: false,
	tab: 'TodoPane',
	open: {
		left: false,
		right: false,
		bottom: false,
		top: false,
	},
	anchor: 'left',
	journals: [
		{
			id: 1,
			date: 'Jul-22-2022',
			credit: 'Equity share capital',
			debit: 'ABS HDFC',
			amount: 50000,
			document: '1',
			notes: '-',
			country: 'US',
			oneOf: [],
			countries: [],
		},
		{
			id: 2,
			date: 'Sep-24-2022',
			credit: 'ABS HDFC',
			debit: 'uber',
			amount: 249,
			document: 'S11669701',
			notes: '-',
			country: 'India',
			oneOf: [],
			countries: [],
		},
	],
	ledgers: [
		{
			id: 1,
			ledger: 'ABS HDFC',
			type: 'Asset',
			accountType: 'Real',
			balances: 79453.3,
			notes: '-',
			isActive: false,
			time: '',
			dateTime: '2018-06-12 19:30:55',
			integer: 5,
			phoneNo: '1234567890',
		},
		{
			id: 2,
			ledger: 'Adayar Anandha bhavan',
			type: 'Liability',
			accountType: 'Personal',
			balances: 0,
			notes: '-',
			time: '13:30:00',
			isActive: true,
			integer: 5.85,
		},
	],
};

export default seed;
