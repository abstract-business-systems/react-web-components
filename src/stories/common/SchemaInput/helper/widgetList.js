import Slider from '../component/SliderWrapper';
import CheckboxGroup from '../component/CheckboxGroupWrapper';
import RadioGroup from '../component/RadioWrapper';
import Pagination from '../component/PaginationWrapper';
import Rating from '../component/RatingWrapper';
import Switch from '../component/SwitchWrapper';
import FieldInput from '../component/FieldInput';
import TextArea from '../component/TextAreaWrapper';
import ProgressBar from '../component/ProgressBarWrapper';
import SingleSelect from '../component/SingleSelect';
import MultiSelect from '../component/MultiSelectWrapper';

const widgetList = {
	slider: Slider,
	checkboxGroup: CheckboxGroup,
	radioGroup: RadioGroup,
	pagination: Pagination,
	rating: Rating,
	switch: Switch,
	textArea: TextArea,
	select: SingleSelect,
	multiSelect: MultiSelect,
	progressBar: ProgressBar,
	dateTimePicker: FieldInput,
	timePicker: FieldInput,
	datePicker: FieldInput,
	input: FieldInput,
	color: FieldInput,
	password: FieldInput,
	checkbox: FieldInput,
};

export default widgetList;
