import { isEmail, isISO8601, isLength } from 'validator';

export const required = value => (value ? undefined : "Required");
export const validEmail = value => (isEmail(value) ? '' : "invalid email");
export const validDate = value => (isISO8601(value) ? '' : "invalid date");
export const minSix = value => (isLength(value, { min: 6 }) ? '' : 'minumum 6 characters');
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);