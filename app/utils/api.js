/**
 * Gets the repositories of the user from Github
 */

import { call, put, select } from 'redux-saga/effects';

import request from 'utils/request';

const defaultEnvironment = 'development';
const environment = process.env.REACT_APP_CADENZA_ENV || defaultEnvironment;

export const API_URL = process.env.REACT_APP_API_URL;
// export const CONTENT_TYPE = "application/json";
export const ACCEPT = "application/json";

const generateHeaders = function(method, userToken) {
    if (userToken == undefined && localStorage.getItem('userToken')) {
        userToken = localStorage.getItem('userToken');
    }
    switch(method) {
        case 'AUTH':
            return { 'accept': ACCEPT };
        case 'GET':
            return { Accept: ACCEPT, Authorization: `Bearer ${userToken}` };
        case 'PUT':
            return { Authorization: `Bearer ${userToken}` };
        case 'POST':
            return { 'Accept': ACCEPT, Authorization: `Bearer ${userToken}` };
        case 'DELETE':
            return { Authorization: `Bearer ${userToken}` }
    }
};

export default function* callAPI(pathname, onComplete, onFailed, method = 'GET', {params, isFormData}) {
  const requestURL = `${API_BASEURL}/${pathname}`;
  const body = params || {};
  try {
    const options = {
      method: method,
      headers: generateHeaders(method),
      body: isFormData ? body : JSON.stringify(body)
    };
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL, options);
    if (method == 'AUTH') {
      const {user} = data;
      localStorage.setItem('userToken', user.auth_token);
    }
    yield put(onComplete(data, body));
  } catch (err) {
    yield put(onFailed(err));
  }
}
