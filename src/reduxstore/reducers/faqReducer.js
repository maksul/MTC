import * as types from '../types';

const initialState = {
    faqs: [],
    loading: false,
    isLoaded: false,
    isFaqCreated: false,
    isFaqUpdated: false,
    isFaqDeleted: false
}

// export faq reducet
const faqReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_FAQS:
            return {
                ...state,
                faqs: action.payload,
                loading: false,
                isLoaded: true
            };
        case types.FAQS_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.ADD_FAQ:
            return {
                ...state,
                faqs: [
                    action.payload, ...state.faqs
                ],
                isFaqCreated: true
            }
        case types.RESET_FAQ_CREATED:
            return {
                ...state,
                isFaqCreated: false
            }
        case types.UPDATE_FAQ:
            return {
                ...state,
                faqs: state
                    .faqs
                    .map(faq => {
                        if (faq._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return faq;
                        }
                    }),
                isFaqUpdated: true
            }
        case types.RESET_FAQ_UPDATED:
            return {
                ...state,
                isFaqUpdated: false
            }
        case types.DELETE_FAQ:
            return {
                ...state,
                faqs: state
                    .faqs
                    .filter(faq => faq._id !== action.payload),
                isFaqDeleted: true
            }
        case types.RESET_FAQ_DELETED:
            return {
                ...state,
                isFaqDeleted: false
            }
        default:
            return state;
    }
}

export default faqReducer;