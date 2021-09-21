import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getPages = () => dispatch => {
	dispatch(setPagesLoading());
	axios.get(`${config.BEHOST}/api/pages/fetchallpages`)
		.then(res => dispatch({
			type: types.GET_PAGES,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const addPage = (newPage) => (dispatch, getState) => {
	const requestBody = JSON.stringify(newPage);
	axios.post(`${config.BEHOST}/api/pages/createnewpage`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.ADD_PAGE,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updatePage = (pageId, updatedPage) => (dispatch, getState) => {
	const requestBody = JSON.stringify(updatedPage);
	axios.put(`${config.BEHOST}/api/pages/updateonepage/${pageId}`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_PAGE,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deletePage = (pageId) => (dispatch, getState) => {

	axios.delete(`${config.BEHOST}/api/pages/deleteonepage/${pageId}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.DELETE_PAGE,
				payload: pageId
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const resetPageCreated = () => {
	return {
		type: types.RESET_PAGE_CREATED
	}
}

export const resetPageUpdated = () => {
	return {
		type: types.RESET_PAGE_UPDATED
	}
}

export const resetPageDeleted = () => {
	return {
		type: types.RESET_PAGE_DELETED
	}
}

export const setPagesLoading = () => {
	return {
		type: types.PAGES_LOADING
	}
}