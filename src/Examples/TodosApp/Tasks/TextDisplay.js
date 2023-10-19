import { Grid } from '@mui/material';
import React from 'react';
import { Display } from '../../../components/WithState';

const displayProps = { value: './data/text/' };

const TextDisplay = () =>
	<Grid
		item={ true }
		margin={ 1 }
		xs={ 4 }
	>
		<Display { ...displayProps }/>
	</Grid>;

export default TextDisplay;
