import {combineReducers} from 'redux';
import SelectionReducer from './SelectionReducer';
import JobFormReducer from './JobFormReducer'
import AuthReducer from './AuthReducer'
//import EventsReducer from './EventsReducer'
import UpdatesReducer from './UpdatesReducer'
//import Router from '../Tabs/Router'

export default combineReducers({
	selectedInfoId: SelectionReducer,
	selectedJobId: SelectionReducer,
	auth: AuthReducer,
	jobForm: JobFormReducer,
	//eventList: EventsReducer,
	updateList: UpdatesReducer,
	//nav: Router //added
});
