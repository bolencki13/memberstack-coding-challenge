import { EasyJWTRequest } from 'ts-easy-jwt-client'

const server = process.env.REACT_APP_SERVER
if (!server) {
  throw new Error('REACT_APP_SERVER is not set in the env.')
}

function getUrl(path: string, host: string = server!) {
  return host + path
}

export const refreshRequest = new EasyJWTRequest({
  url: getUrl('/api/auth/refresh'),
  method: 'POST'
})

export const meRequest = new EasyJWTRequest({
  url: getUrl('/api/auth/me'),
  method: 'GET',
  needsAuth: true
})

export const registerRequest = new EasyJWTRequest({
  url: getUrl('/api/auth/register'),
  method: 'POST',
  needsAuth: false
})

export const loginRequest = new EasyJWTRequest({
  url: getUrl('/api/auth/login'),
  method: 'POST',
  needsAuth: false
})

export const logoutRequest = new EasyJWTRequest({
  url: getUrl('/api/auth/logout'),
  method: 'POST',
  needsAuth: true
})

export const planRetrieveRequest = new EasyJWTRequest({
  url: getUrl('/api/plan'),
  method: 'GET'
})
