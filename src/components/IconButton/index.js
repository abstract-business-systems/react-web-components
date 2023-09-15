import React from 'react';
import MuiIconButton from '@mui/material/IconButton';
import Icon from '../Icon';

const IconButton = ({ icon, ...rest }) => <MuiIconButton { ...rest }>
	<Icon { ...{ icon } }/>
</MuiIconButton>;

export default IconButton;
