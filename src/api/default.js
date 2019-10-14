import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/users/login',
    method: 'POST',
    data
  })
}

export function getUserInfo (params) {
  return request({
    url: '/users/info',
    method: 'get',
    params
  })
}

export function logout () {
  return request({
    url: '/users/logout',
    method: 'POST'
  })
}

export function getCaptcha (params) {
  return request({
    url: '/users/captcha',
    method: 'get',
    params
  })
}

export function signIn (data) {
  return request({
    url: '/users/sign-in',
    method: 'POST',
    data
  })
}

// 获取七牛云token
export function getUploadToken () {
  return request({
    url: '/upload/key',
    method: 'get'
  })
}

export function uploadMusic (data) {
  return request({
    url: '/songs/upload',
    method: 'POST',
    data
  })
}

export function getSongs (params) {
  return request({
    url: '/songs',
    method: 'get',
    params
  })
}
