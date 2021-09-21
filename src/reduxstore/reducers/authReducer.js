import * as types from '../types';
import {config} from '../../config/keys';

const initialState = {
    token: typeof window !== 'undefined'
        ? localStorage.getItem(config.localStorageTokenId)
        : null,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    isAttemptingLogin: false,
    isLoginFailed: false,
    isUserLoaded: false
} 

const authReducer = (state = initialState, action) => { //exporting the reducer function
    switch (action.type) {
        case types.USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case types.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                isUserLoaded: true
            };
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            if (typeof window !== 'undefined') {
                localStorage.setItem(config.localStorageTokenId, action.payload.token);
            }
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                isAttemptingLogin: false,
                isLoginFailed: false
            };
        case types.AUTH_ERROR:
        case types.LOGIN_FAIL:
        case types.LOGOUT_SUCCESS:
        case types.REGISTER_FAIL:
            if (typeof window !== 'undefined') {
                localStorage.removeItem(config.localStorageTokenId);
            }
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isAttemptingLogin: false,
                isUserLoaded: true
            };
        case types.FETCH_TOKEN:
            return {
                ...state,
                token: typeof window !== 'undefined'
                    ? localStorage.getItem(config.localStorageTokenId)
                    : null
            }
        case types.ATTEMPT_LOGIN:
            return {
                ...state,
                isAttemptingLogin: true
            }
        case types.RESET_LOGIN_FAILED:
            return {
                ...state,
                isLoginFailed: false
            }
        case types.ATTEMPT_LOGIN_FAILED:
            return {
                ...state,
                isLoginFailed: true
            }
        default:
            return state;
    }

}

export default authReducer;