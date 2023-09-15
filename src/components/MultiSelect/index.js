import React from 'react';
import Select from '../Select';

const MultiSelect = (args) => <Select { ...{ ...args, multiple: true } }/>;

export default MultiSelect;
