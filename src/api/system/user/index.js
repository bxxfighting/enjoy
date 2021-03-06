import request from '@/utils/request'
import url from './url'

export function login(data) {
  return request({
    url: url.loginUserUrl,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: url.currentUserUrl,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: url.logoutUserUrl,
    method: 'post'
  })
}

export function createUserApi(data) {
  return request({
    url: url.createUserUrl,
    method: 'post',
    data
  })
}

export function updateUserApi(data) {
  return request({
    url: url.updateUserUrl,
    method: 'post',
    data
  })
}

export function deleteUserApi(data) {
  return request({
    url: url.deleteUserUrl,
    method: 'post',
    data
  })
}

export function getUserListApi(data) {
  return request({
    url: url.getUserListUrl,
    method: 'get',
    params: data
  })
}

export function getUserRoleListApi(data) {
  return request({
    url: url.getUserRoleListUrl,
    method: 'get',
    params: data
  })
}

export function getUserDepartmentListApi(data) {
  return request({
    url: url.getUserDepartmentListUrl,
    method: 'get',
    params: data
  })
}

export function getUserApi(data) {
  return request({
    url: url.getUserUrl,
    method: 'get',
    params: data
  })
}
