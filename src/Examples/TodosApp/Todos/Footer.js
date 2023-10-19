import { Grid } from '@mui/material';
import React from 'react';
import FilterBar from './FilterBar';
import ClearCompleted from './ClearCompleted';

const Footer = () =>
	<Grid margin={ 2 } container={ true } justifyContent="center">
		<Grid item={ true } xs={ 4 }><FilterBar/></Grid>
		<Grid item={ true } xs={ 1 }><ClearCompleted/></Grid>
	</Grid>;

export default Footer;
