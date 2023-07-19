import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Sections = ({ label, content }) => <Box>
	<Box>{ label }</Box>
	<Box>{ content }</Box>
	<Outlet/>
</Box>;

export default Sections;
