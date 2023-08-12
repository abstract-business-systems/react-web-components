import React, { useEffect } from 'react';
import { NavContext } from '../../../components/Navigation/GlobalContext';
import scaffold from './helper/scaffold.js';

const setLoad = ({ currPath, name, label }) => ({
	option: {
		parentPath: currPath,
		sections: scaffold(currPath.split('/').map((data) => (data ? `/children/${ data }` : data))
			.join(''),
		{
			children: {},
			name: name,
			label: label || name,
			path: currPath,
		}),
	},
});

const ChildSection = ({
	parentPath = '', name = '', context,
	label = '', children,
}) => {
	const currPath = `${ parentPath }${ name }/`;
	const currLocation = context.state.location
		.find(({ path }) => path === currPath);

	useEffect(() => {
		context.onLoad(setLoad({ currPath, name, label, context }));
	}, []);

	return <section className="section">
		{ React.Children.map(children, (child) =>
			(child.type.name === 'Section'
				? React.cloneElement(child,
					{ parentPath: currPath })
				: currLocation && child)) }
	</section>;
};

const Section = (props) =>
	<NavContext.Consumer>
		{ (context) =>
			<ChildSection { ...{ ...props, context } }/> }
	</NavContext.Consumer>;

export default Section;
