import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getFaqs = () => dispatch => {
	dispatch(setFaqsLoading());
	axios.get(`${config.BEHOST}/api/faqs/fetchallfaqs`)
		.then(res => dispatch({
			type: types.GET_FAQS,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const addFaq = (newFaq) => (dispatch, getState) => {
	const requestBody = JSON.stringify(newFaq);
	axios.post(`${config.BEHOST}/api/faqs/createnewfaq`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.ADD_FAQ,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateFaq = (faqId, updatedFaq) => (dispatch, getState) => {
	const requestBody = JSON.stringify(updatedFaq);
	axios.put(`${config.BEHOST}/api/faqs/updateonefaq/${faqId}`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_FAQ,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteFaq = (faqId) => (dispatch, getState) => {

	axios.delete(`${config.BEHOST}/api/faqs/deleteonefaq/${faqId}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.DELETE_FAQ,
				payload: faqId
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const resetFaqCreated = () => {
	return {
		type: types.RESET_FAQ_CREATED
	}
}

export const resetFaqUpdated = () => {
	return {
		type: types.RESET_FAQ_UPDATED
	}
}

export const resetFaqDeleted = () => {
	return {
		type: types.RESET_FAQ_DELETED
	}
}

export const setFaqsLoading = () => {
	return {
		type: types.FAQS_LOADING
	}
}