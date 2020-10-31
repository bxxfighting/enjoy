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
    method: 'post',
    data
  })
}

export function getRoleApi(data) {
  return request({
    url: url.getRoleUrl,
    method: 'post',
    data
  })
}