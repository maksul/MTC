import axios from 'axios';
import * as types from '../types';
import { config } from '../../config/keys';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


export const getGalleries = () => dispatch => {
	dispatch(setGalleriesLoading());
	axios.get(`${config.BEHOST}/api/galleries/fetchallgalleries`)
		.then(res => dispatch({
			type: types.GET_GALLERIES,
			payload: res.data
		}))
		.catch(err => console.log(err));
}

export const addGallery = (newGallery) => (dispatch, getState) => {
	const requestBody = JSON.stringify(newGallery);
	axios.post(`${config.BEHOST}/api/galleries/createnewgallery`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.ADD_GALLERY,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateGallery = (galleryId, updatedGallery) => (dispatch, getState) => {
	const requestBody = JSON.stringify(updatedGallery);
	axios.put(`${config.BEHOST}/api/galleries/updateonegallery/${galleryId}`, requestBody, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.UPDATE_GALLERY,
				payload: res.data
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


export const deleteGallery = (galleryId) => (dispatch, getState) => {

	axios.delete(`${config.BEHOST}/api/galleries/deleteonegallery/${galleryId}`, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: types.DELETE_GALLERY,
				payload: galleryId
			});
		})
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const resetGalleryCreated = () => {
	return {
		type: types.RESET_GALLERY_CREATED
	}
}

export const resetGalleryUpdated = () => {
	return {
		type: types.RESET_GALLERY_UPDATED
	}
}

export const resetGalleryDeleted = () => {
	return {
		type: types.RESET_GALLERY_DELETED
	}
}

export const setGalleriesLoading = () => {
	return {
		type: types.GALLERIES_LOADING
	}
}