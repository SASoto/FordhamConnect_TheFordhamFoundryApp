import {SELECT_INFO, SELECT_JOB} from './types'


export const selectInfo = (infoId) => {
	return {
		type: SELECT_INFO,
		payload: infoId
	};
};

export const selectJob = (jobId) => {
	return {
		type: SELECT_JOB,
		payload: jobId
	}
};