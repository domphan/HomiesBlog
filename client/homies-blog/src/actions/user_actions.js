import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_USER, SET_ERRORS, LOAD_USER_INFO, CLEAR_ERRORS } from '.';

const URL = 'http://localhost:3001';

export const signup = (user, history) => async dispatch => {
  const response = await axios.post(`${URL}/api/users/signup`, user)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      });
    });
  if (response) {
    history.push('/login');
  }
}

export const login = (user, history) => async dispatch => {
  let response = await axios.post(`${URL}/api/users/login`, user)
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      });
    });
  if (response) {
    const { token } = response.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decodedToken = jwt_decode(token);
    dispatch(setCurrentUser(decodedToken));
    history.push('/');
  }
}

export const setCurrentUser = (decodedToken) => {
  return {
    type: SET_USER,
    payload: decodedToken,
  }
}

export const logoutUser = history => dispatch => {
  const NULL_USER = {};
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser(NULL_USER));
  history.push('/login');
}

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export const setErrorMsg = (message) => {
  return {
    type: SET_ERRORS,
    payload: {
      error: message
    }
  };
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
    payload: {}
  });
}

export const getUserInfo = () => async dispatch => {
  let response = await axios.get(`${URL}/api/users`)
    .catch(err => {
      if (err.response.data != 'Unauthorized') {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.error
        });
      }
    });
  if (response) {
    dispatch({
      type: LOAD_USER_INFO,
      payload: response.data
    })
  }
}