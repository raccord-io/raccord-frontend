import { stringify } from 'query-string';
import { Mutex } from 'async-mutex';

import { fetchTimeout } from './fetchTimeout';

const API_URL = process.env.REACT_APP_API_URL;

export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';
export const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken';

export type HTTPMethod =
  | 'CONNECT'
  | 'DELETE'
  | 'GET'
  | 'HEAD'
  | 'OPTIONS'
  | 'PATCH'
  | 'PUT'
  | 'POST'
  | 'TRACE';

type AccessTokenRefreshToken = {
  accessToken: string;

  refreshToken?: string;
};

export class ApiError extends Error {
  statusCode: number;

  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage);

    this.statusCode = statusCode;
  }
}

const refreshTokenMutex = new Mutex();

/* Use it because cannot import store directly (circular dependencies) */
let dispatch: any | undefined;
export const setDispatch = (dispatchFn: any) => {
  dispatch = dispatchFn;
};

export const apiRequest = async <T>(
  method: HTTPMethod,
  endpoint: string,
  params?: Record<string, string | number>,
  body?: FormData | Record<string, unknown>,
  timeout = 20000
) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  //   const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  let query = API_URL + endpoint;

  if (params) {
    query += '?' + stringify(params);
  }

  const fetchConfig: any = {
    method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (accessToken) {
    fetchConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (body) {
    if (body instanceof FormData) {
      fetchConfig.body = body;
      fetchConfig.headers['Content-Type'] = 'multipart/form-data';
    } else {
      fetchConfig.body = JSON.stringify(body);
      fetchConfig.headers['Content-Type'] = 'application/json';
    }
  }

  const response = await fetchTimeout(query, fetchConfig, timeout);
  let bodyResult;
  if (response.status !== 204) {
    bodyResult = await response.json();
  }
  bodyResult = await response.json();

  if (!response.ok) {
    /* Logs message if Bad request */
    if (response.status === 400) {
      console.log('ERROR Api bad request:', bodyResult?.message);
    }
    /* Try to use refresh token if exists */
    // if (response.status === 401 && refreshToken) {
    //   const tokens = await (refreshTokenMutex.isLocked()
    //     ? refreshTokenMutex.waitForUnlock().then(() => ({
    //         accessToken: localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY),
    //         refreshToken: localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    //       }))
    //     : useRefreshToken(refreshToken, timeout));

    //   if (tokens?.accessToken) {
    //     fetchConfig.headers.Authorization = `Bearer ${tokens.accessToken}`;
    //     response = await fetchTimeout(query, fetchConfig, timeout);
    //     if (response.status !== 204) {
    //       bodyResult = await response.json();
    //     }

    //     if (response.ok) {
    //       return bodyResult as T;
    //     }
    //   }
    //   if (dispatch) {
    //     dispatch(logout());
    //   }
    // }
    throw new ApiError(bodyResult.message, response.status);
  }
  return bodyResult as T;
};
