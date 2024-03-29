import React from 'react';
import MuiTreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { map, values } from '@laufire/utils/collection';
import MuiLink from '../Link';
import buildEvent from '../common/helper/buildEvent';
import { identity } from '@laufire/utils/fn';
import transformOptions from '../common/helper/transformOptions';

const GetLabel = ({ onChange = identity, value = [], option }) => {
	const hasCurValue = value[value.length - 1]?.value === option.value;

	return (
		<MuiLink
			{ ...{
				onClick: () => hasCurValue
				|| onChange(buildEvent({ value: option.value })),
				underline: 'none',
				color: hasCurValue ? 'primary' : 'inherit',
			} }
		>
			{ option.label }
		</MuiLink>);
};

const TreeItems = (props) => values(map(props.options, (option) => {
	const { children, name } = option;

	return (
		<TreeItem
			key={ name }
			nodeId={ name }
			label={ <GetLabel { ...{ option, ...props } }/> }
		>{ children
				&& <TreeItems { ...{
					...props,
					options: children,
				} }/> }
		</TreeItem>);
}));

const TreeView = (props) => {
	const { options = {}} = props;

	return (
		<MuiTreeView
			defaultCollapseIcon={ <ExpandMoreIcon/> }
			defaultExpandIcon={ <ChevronRightIcon/> }
			sx={ { overflowX: 'hidden' } }
		>
			<TreeItems { ...{
				...props,
				options: transformOptions(options),
			} }
			/>
		</MuiTreeView>);
};

export default TreeView;
