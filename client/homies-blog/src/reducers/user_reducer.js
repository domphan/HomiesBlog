import { SET_USER, LOAD_USER_INFO, USER_LOADING } from '../actions';
import { isEmpty } from 'lodash';

const initialState = {
  authenticated: false,
  user: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        authenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_USER_INFO:
      return {
        ...state,
        userinfo: action.payload,
        isLoading: false
      }
    default:
      return state;
  }
}