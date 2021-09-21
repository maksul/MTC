import * as types from '../types';

const initialState = {
    pages: [],
    loading: false,
    isLoaded: false,
    isPageCreated: false,
    isPageUpdated: false,
    isPageDeleted: false
}

// export page reducet
const pageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_PAGES:
            return {
                ...state,
                pages: action.payload,
                loading: false,
                isLoaded: true
            };
        case types.PAGES_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.ADD_PAGE:
            return {
                ...state,
                pages: [
                    action.payload, ...state.pages
                ],
                isPageCreated: true
            }
        case types.RESET_PAGE_CREATED:
            return {
                ...state,
                isPageCreated: false
            }
        case types.UPDATE_PAGE:
            return {
                ...state,
                pages: state
                    .pages
                    .map(page => {
                        if (page._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return page;
                        }
                    }),
                isPageUpdated: true
            }
        case types.RESET_PAGE_UPDATED:
            return {
                ...state,
                isPageUpdated: false
            }
        case types.DELETE_PAGE:
            return {
                ...state,
                pages: state
                    .pages
                    .filter(page => page._id !== action.payload),
                isPageDeleted: true
            }
        case types.RESET_PAGE_DELETED:
            return {
                ...state,
                isPageDeleted: false
            }
        default:
            return state;
    }
}

export default pageReducer;