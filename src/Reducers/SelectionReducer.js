import {SELECT_INFO, SELECT_JOB} from '../Actions/types'


const INITIAL_STATE = {
	expanded: false,
	jobSelected: null
}


export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SELECT_INFO:
			return action.payload;

		case SELECT_JOB:
			return {...state, expanded: true, jobSelected: action.payload.jobId};

		default:
			return state;
	}
}