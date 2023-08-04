/* eslint-disable react/destructuring-assignment */
import React, { useContext, useMemo } from 'react';
import { NavContext } from './NavContext.js';
import { merge } from '@laufire/utils/collection.js';
import scaffold from './helper/scaffold.js';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line max-lines-per-function, complexity
const Section = ({ children, name, pathname, location, label }) => {
	const level = useContext(NavContext);

	const path = `${ level.path }${ name }/`;
	const currLocation = location
		|| level.location.find((data) => data.path === path);

	const navigate = useNavigate();

	return (
		<section className="section">
			<NavContext.Provider
				value={ useMemo(() => ({
					pathname: pathname || level.pathname,
					location: location || level.location,
					value: level.value + 1,
					path: path,
					options: merge(level.options,
						scaffold(path.split('/')
							.map((data) => (data ? `/children/${ data }` : data))
							.join(''),
						{
							children: {},
							name: name,
							label: label || name,
						})),
				}),
				[name, location, level.location, pathname, level.pathname]) }
			>
				{ React.Children.map(children, (child) =>
					(child.type.name === 'Section'
						? React.cloneElement(child)
						: currLocation && child)) }
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a onClick={ () => { navigate(`${ level.path }${ name }/`); } }>
					{ `${ level.path }${ name }/` }
				</a>
			</NavContext.Provider>
		</section>
	);
};

export default Section;
