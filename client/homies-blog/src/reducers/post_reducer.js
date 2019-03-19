import { LOAD_USER_POSTS, CREATE_POST } from '../actions'

const initialState = {
  userPosts: {},
  friendPosts: {},
  singlePost: {}
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
        userPosts: [...Array.from(state.userPosts), action.payload]
      }
    default:
      return state;
  }
}