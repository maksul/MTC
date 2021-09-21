import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getAccesses = () => dispatch => {
	dispatch(setAccessesLoading());
	axios.get(`${config.BEHOST}/api/accesses/fetchallaccesses`)
		.then(res => dispatch({
			type: types.GET_ACCESSES,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const addAccess = (newAccess) => (dispatch, getState) => {
	const requestBody = JSON.stringify(newAccess);
	axios.post(`${config.BEHOST}/api/accesses/createnewaccess`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.ADD_ACCESS,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateAccess = (accessId, updatedAccess) => (dispatch, getState) => {
	const requestBody = JSON.stringify(updatedAccess);
	axios.put(`${config.BEHOST}/api/accesses/updateoneaccess/${accessId}`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_ACCESS,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteAccess = (accessId) => (dispatch, getState) => {

	axios.delete(`${config.BEHOST}/api/accesses/deleteoneaccess/${accessId}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.DELETE_ACCESS,
				payload: accessId
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const resetAccessCreated = () => {
	return {
		type: types.RESET_ACCESS_CREATED
	}
}

export const resetAccessUpdated = () => {
	return {
		type: types.RESET_ACCESS_UPDATED
	}
}

export const resetAccessDeleted = () => {
	return {
		type: types.RESET_ACCESS_DELETED
	}
}

export const setAccessesLoading = () => {
	return {
		type: types.ACCESSES_LOADING
	}
}