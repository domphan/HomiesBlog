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
  if (content.upload) {
    let data = new FormData();
    data.append('image', content.upload);
    let imageUpload = await axios.post(
      `${URL}/api/posts/img`, data)
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.error
        })
      })
    if (imageUpload) {
      content = { ...content, mediaUrl: imageUpload.data.mediaUrl }
    }
  }
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

export const deletePost = (postID) => async dispatch => {
  let response = await axios.delete(`${URL}/api/posts/${postID}`)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    })
  if (response.status >= 200 && response.status < 400) {
    dispatch(loadUserPosts());
  }
}

export const updatePost = (post, id) => async dispatch => {
  let response = await axios.patch(`${URL}/api/posts/${id}`, post)
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.error
      })
    })
  if (response.status >= 200 && response.status < 400) {
    dispatch(loadUserPosts());
  }
}