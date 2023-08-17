import React from 'react';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { map, values } from '@laufire/utils/collection';
import MuiLink from './Link';
import buildEvent from './helper/buildEvent';
import { identity } from '@laufire/utils/fn';

const GetLabel = ({ path, onChange, value, label }) => {
	const hasCurValue = value[value.length - 1]?.href === path;

	return (
		<MuiLink
			{ ...{
				onClick: () =>
					hasCurValue || onChange(buildEvent({ value: path })),
				underline: 'none',
				color: hasCurValue ? 'primary' : 'inherit',
			} }
		>
			{ label }
		</MuiLink>);
};

const TreeItems = ({ options, value, onChange = identity }) =>
	values(map(options, ({ children, label, name, path }) =>
		<TreeItem
			key={ name }
			nodeId={ name }
			label={ <GetLabel { ...{ path, value, onChange, label } }/> }
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
