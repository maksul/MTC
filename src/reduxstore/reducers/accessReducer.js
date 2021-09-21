import * as types from '../types';

const initialState = {
    accesses: [],
    loading: false,
    isLoaded: false,
    isAccessCreated: false,
    isAccessUpdated: false,
    isAccessDeleted: false
}

// export access reducet
const accessReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ACCESSES:
            return {
                ...state,
                accesses: action.payload,
                loading: false,
                isLoaded: true
            };
        case types.ACCESSES_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.ADD_ACCESS:
            return {
                ...state,
                accesses: [
                    action.payload, ...state.accesses
                ],
                isAccessCreated: true
            }
        case types.RESET_ACCESS_CREATED:
            return {
                ...state,
                isAccessCreated: false
            }
        case types.UPDATE_ACCESS:
            return {
                ...state,
                accesses: state
                    .accesses
                    .map(access => {
                        if (access._id === action.payload._id) {
                            return action.payload;
                        } else {
                            return access;
                        }
                    }),
                isAccessUpdated: true
            }
        case types.RESET_ACCESS_UPDATED:
            return {
                ...state,
                isAccessUpdated: false
            }
        case types.DELETE_ACCESS:
            return {
                ...state,
                accesses: state
                    .accesses
                    .filter(access => access._id !== action.payload),
                isAccessDeleted: true
            }
        case types.RESET_ACCESS_DELETED:
            return {
                ...state,
                isAccessDeleted: false
            }
        default:
            return state;
    }
}

export default accessReducer;