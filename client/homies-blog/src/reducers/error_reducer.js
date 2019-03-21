import { GET_ERRORS, SET_ERRORS, CLEAR_ERRORS } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return { ...state, message: action.payload };
    case SET_ERRORS:
      return { ...state, message: action.payload.error };
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}