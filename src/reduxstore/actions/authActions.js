import axios from 'axios';
import * as types from '../types';
import {config} from '../../config/keys';
import {returnErrors} from './errorActions';

export const loadUser = () => (dispatch, getState) => { //getState fetches the current statue  in the reducer store

    dispatch({type: types.USER_LOADING});

    const token = getState().auth.token;

    // Headers
    const headerConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers
    if (token) {

        headerConfig.headers['x-auth-token'] = token;

        axios
            .get(`${config.BEHOST}/api/auth/fetchauthenticateduser`, headerConfig)
            .then(res => {
                dispatch({type: types.USER_LOADED, payload: res.data})
            })
            .catch(err => {
                err.response && dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({type: types.AUTH_ERROR});
            })
    } else {
        dispatch(returnErrors("No token in local storage.", 404));
        dispatch({type: types.AUTH_ERROR});
    }

}

// action function to login user
export const login = ({username, password}) => dispatch => {
    //header (config)
    const headerConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({username, password});

    dispatch({type: types.ATTEMPT_LOGIN})

    // make post requeest to server
    axios
        .post(`${config.BEHOST}/api/auth/authenticateuser`, body, headerConfig)
        .then(res => dispatch({type: types.LOGIN_SUCCESS, payload: res.data}))
        .catch(err => {
            err.response && dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({type: types.LOGIN_FAIL})
            dispatch({type: types.ATTEMPT_LOGIN_FAILED})
            window.setTimeout(() => {
                dispatch({type: types.RESET_LOGIN_FAILED})
            }, 3000)
        })

}

// action function to register users
export const register = ({username, password, retypePassword, accessName, accessKey}) => dispatch => {
    //header (config)
    const headerConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({username, password, retype_password: retypePassword, access_name: accessName, access_key: accessKey});

    dispatch({type: types.ATTEMPT_LOGIN})

    // make post requeest to server
    axios
        .post(`${config.BEHOST}/api/users/reguser`, body, headerConfig)
        .then(res => dispatch({type: types.LOGIN_SUCCESS, payload: res.data}))
        .catch(err => {
            err.response && dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({type: types.LOGIN_FAIL})
            dispatch({type: types.ATTEMPT_LOGIN_FAILED})
            window.setTimeout(() => {
                dispatch({type: types.RESET_LOGIN_FAILED})
            }, 3000)
        })
}

// action function to logout user
export const logout = () => {
    return {type: types.LOGOUT_SUCCESS}
}

// function to return token config
export const tokenConfig = getState => {
    //get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;

}