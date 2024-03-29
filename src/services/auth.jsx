import apiCall from './api';

export const signUp = async data => {
  return await apiCall({
    url: '/api/signup',
    method: 'POST',
    data
  });
};

export const signIn = async data => {
  return await apiCall({
    url: '/api/login',
    method: 'POST',
    data
  });
};