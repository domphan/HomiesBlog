import axios from 'axios';
import { LOAD_USER_POSTS, GET_ERRORS, CREATE_POST } from '.';

const URL = 'http://localhost:3001';


export const loadUserPosts = () => async dispatch => {
  let response = await axios.get(`${URL}/api/posts`)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
  if (response) {
    dispatch({
      type: LOAD_USER_POSTS,
      payload: response.data
    });
  }
}

export const createPost = (content, history) => async dispatch => {
  let response = await axios.post(`${URL}/api/posts`, content)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    })
  if (response) {
    dispatch({
      type: CREATE_POST,
      payload: response.data
    })
    history.push('/feed');
  }
}