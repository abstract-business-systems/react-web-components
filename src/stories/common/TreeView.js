import React from 'react';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Link } from 'react-router-dom';
import { map, values } from '@laufire/utils/collection';

const getTreeItem = ({ children, label, name, path }, key) =>
	<TreeItem
		key={ key }
		nodeId={ name }
		label={ <Link to={ path }>{ label }</Link> }
	>
		{ children && values(map(children, getTreeItem)) }
	</TreeItem>;

const TreeView = ({ value }) =>
	<MuiTreeView
		defaultCollapseIcon={ <ExpandMoreIcon/> }
		defaultExpandIcon={ <ChevronRightIcon/> }
		sx={ { overflowX: 'hidden' } }
	>
		{ values(map(value, getTreeItem)) }
	</MuiTreeView>;

export default TreeView;
