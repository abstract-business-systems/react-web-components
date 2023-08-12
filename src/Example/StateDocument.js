import React from 'react';
import Document from '../stories/common/Document';
import Section from '../components/Navigation/Section';
import { Button } from '@mui/material';
import GlobalContext from '../stories/common/Document/GlobalContext';

const StateDocument = () =>
	<Document patch={ () => {} }>
		<Section name="parentOne" label="ParentOne">
			<GlobalContext.Consumer>
				{
					(context) => <div>
						<Button
							onClick={ () => {
								context.patch({ button: 'thr' });
							} }
						>hello</Button>
						<div>{ context.state.button }</div>
					</div>
				}
			</GlobalContext.Consumer>
		</Section>

	</Document>;

export default StateDocument;
