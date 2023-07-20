import React from 'react';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Link } from 'react-router-dom';

const getTreeItem = ({ children, label, name }, key) =>
	<TreeItem
		key={ key }
		nodeId={ name }
		label={ <Link to={ name }>{ label }</Link> }
	>
		{ children && children.map(getTreeItem) }
	</TreeItem>;

const TreeView = ({ value }) =>
	<MuiTreeView
		defaultCollapseIcon={ <ExpandMoreIcon/> }
		defaultExpandIcon={ <ChevronRightIcon/> }
	>
		{ value.map(getTreeItem) }
	</MuiTreeView>;

export default TreeView;
