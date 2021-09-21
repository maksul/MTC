import * as types from '../types';

const initialState = {
    galleries: [],
    loading: false,
    isLoaded: false,
    isGalleryCreated: false,
    isGalleryUpdated: false,
    isGalleryDeleted: false
}

// export gallery reducer
const galleryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_GALLERIES:
            return {
                ...state,
                galleries: action.payload,
                loading: false,
                isLoaded: true
            };
        case types.GALLERIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.ADD_GALLERY:
            return {
                ...state,
                galleries: [
                    action.payload, ...state.galleries
                ],
                isGalleryCreated: true
            }
        case types.RESET_GALLERY_CREATED:
            return {
                ...state,
                isGalleryCreated: false
            }
        case types.UPDATE_GALLERY:
            return {
                ...state,
                galleries: state
                    .galleries
                    .map(gallery => {
                        if (gallery._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return gallery;
                        }
                    }),
                isGalleryUpdated: true
            }
        case types.RESET_GALLERY_UPDATED:
            return {
                ...state,
                isGalleryUpdated: false
            }
        case types.DELETE_GALLERY:
            return {
                ...state,
                galleries: state
                    .galleries
                    .filter(gallery => gallery._id !== action.payload),
                isGalleryDeleted: true
            }
        case types.RESET_GALLERY_DELETED:
            return {
                ...state,
                isGalleryDeleted: false
            }
        default:
            return state;
    }
}

export default galleryReducer;