import React from 'react';
import { Box, TableHead, TableRow } from '@mui/material';
import HeaderCell from './HeaderCell';

const Header = (context) => {
	const { props: { headerGroups }} = context;

	return <TableHead component={ Box }>
		{ headerGroups.map((headerGroup, key) =>
			<TableRow
				key={ key }
				component={ Box }
				{ ...headerGroup.getHeaderGroupProps() }
			>
				{ headerGroup.headers.map((data, index) =>
					<HeaderCell
						key={ index }
						{ ...{ ...context, index, data } }
					/>) }
			</TableRow>) }
	</TableHead>;
};

export default Header;
