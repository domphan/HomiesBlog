import { LOAD_USER_POSTS, CREATE_POST, UPLOAD_IMAGE } from '../actions'

const initialState = {
  userPosts: {},
  friendPosts: {},
  singlePost: {},
  isUploading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      }
    case CREATE_POST:
      return {
        ...state,
        isUploading: false,
        userPosts: [...Array.from(state.userPosts), action.payload]
      }
    case UPLOAD_IMAGE:
      return {
        ...state,
        isUploading: true
      }
    default:
      return state;
  }
}