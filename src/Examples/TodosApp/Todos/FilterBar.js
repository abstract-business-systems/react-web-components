import React from 'react';
import { Button } from '../../../components/WithState';
import { Box } from '@mui/material';
import initialState from '../initialState';

const path = '/filterTodo/';

const filterButtonProps = (data) => ({ onClick: { data, path }});

const FilterBar = () =>
	<Box>
		{ initialState.filterBar.map(({ name, label }) =>
			<Button key={ name } { ...filterButtonProps(name) }>
				{ label }
			</Button>) }
	</Box>;

export default FilterBar;
