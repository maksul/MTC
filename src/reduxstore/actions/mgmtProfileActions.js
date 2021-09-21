import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getMgmtProfiles = () => dispatch => {
	dispatch(setMgmtProfilesLoading());
	axios.get(`${config.BEHOST}/api/mgmtprofiles/fetchallmgmtprofiles`)
		.then(res => dispatch({
			type: types.GET_MGMTPROFILES,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const addMgmtProfile = (newMgmtProfile) => (dispatch, getState) => {
	const requestBody = JSON.stringify(newMgmtProfile);
	axios.post(`${config.BEHOST}/api/mgmtprofiles/createnewmgmtprofile`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.ADD_MGMTPROFILE,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateMgmtProfile = (mgmtProfileId, updatedMgmtProfile) => (dispatch, getState) => {
	const requestBody = JSON.stringify(updatedMgmtProfile);
	axios.put(`${config.BEHOST}/api/mgmtprofiles/updateonemgmtprofile/${mgmtProfileId}`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_MGMTPROFILE,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteMgmtProfile = (mgmtProfileId) => (dispatch, getState) => {

	axios.delete(`${config.BEHOST}/api/mgmtprofiles/deleteonemgmtprofile/${mgmtProfileId}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.DELETE_MGMTPROFILE,
				payload: mgmtProfileId
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const resetMgmtProfileCreated = () => {
	return {
		type: types.RESET_MGMTPROFILE_CREATED
	}
}

export const resetMgmtProfileUpdated = () => {
	return {
		type: types.RESET_MGMTPROFILE_UPDATED
	}
}

export const resetMgmtProfileDeleted = () => {
	return {
		type: types.RESET_MGMTPROFILE_DELETED
	}
}

export const setMgmtProfilesLoading = () => {
	return {
		type: types.MGMTPROFILES_LOADING
	}
}