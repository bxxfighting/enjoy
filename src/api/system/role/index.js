import request from '@/utils/request'
import url from './url'

export function createRoleApi(data) {
  return request({
    url: url.createRoleUrl,
    method: 'post',
    data
  })
}

export function updateRoleApi(data) {
  return request({
    url: url.updateRoleUrl,
    method: 'post',
    data
  })
}

export function deleteRoleApi(data) {
  return request({
    url: url.deleteRoleUrl,
    method: 'post',
    data
  })
}

export function getRoleListApi(data) {
  return request({
    url: url.getRoleListUrl,
    method: 'get',
    params: data
  })
}

export function getRoleApi(data) {
  return request({
    url: url.getRoleUrl,
    method: 'get',
    params: data
  })
}

export function createRoleUserApi(data) {
  return request({
    url: url.createRoleUserUrl,
    method: 'post',
    data
  })
}

export function deleteRoleUserApi(data) {
  return request({
    url: url.deleteRoleUserUrl,
    method: 'post',
    data
  })
}

export function getRoleUserListApi(data) {
  return request({
    url: url.getRoleUserListUrl,
    method: 'get',
    params: data
  })
}

export function setRoleModApi(data) {
  return request({
    url: url.setRoleModUrl,
    method: 'post',
    data
  })
}

export function setRolePermissionApi(data) {
  return request({
    url: url.setRolePermissionUrl,
    method: 'post',
    data
  })
}

export function getRoleModPermissionApi(data) {
  return request({
    url: url.getRoleModPermissionUrl,
    method: 'get',
    params: data
  })
}
