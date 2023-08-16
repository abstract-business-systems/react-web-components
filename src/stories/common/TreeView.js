import React from 'react';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Link } from 'react-router-dom';
import { map, values } from '@laufire/utils/collection';
import { Typography } from '@mui/material';
import MuiLink from './Link';

const GetLabel = ({ path, value, label }) => {
	const curValue = value[value.length - 1]?.href === path;

	return (
		<MuiLink
			{ ...{
				to: path,
				underline: 'none',
				color: curValue ? 'primary' : 'inherit',
				component: curValue ? Typography : Link,
			} }
		>
			{ label }
		</MuiLink>);
};

const TreeItems = ({ options, value }) =>
	values(map(options, ({ children, label, name, path }) =>
		<TreeItem
			key={ name }
			nodeId={ name }
			label={ <GetLabel { ...{ path, value, label } }/> }
		>
			{ children
			&& <TreeItems { ...{ options: children, value: value } }/> }
		</TreeItem>));

const TreeView = (props) =>
	<MuiTreeView
		defaultCollapseIcon={ <ExpandMoreIcon/> }
		defaultExpandIcon={ <ChevronRightIcon/> }
		sx={ { overflowX: 'hidden' } }
	>
		<TreeItems { ...props }/>
	</MuiTreeView>;

export default TreeView;
