export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';
export const SET_PASSWORD_ERROR = 'SET_PASSWORD_ERROR';

export const updateEmailError = (payload) => ({
  type: SET_EMAIL_ERROR,
  payload,
});
export const updatePasswordError = (payload) => ({
  type: SET_PASSWORD_ERROR,
  payload,
});
