import request from '@/utils/request'
import url from './url'

export function createPermissionApi(data) {
  return request({
    url: url.createPermissionUrl,
    method: 'post',
    data
  })
}

export function updatePermissionApi(data) {
  return request({
    url: url.updatePermissionUrl,
    method: 'post',
    data
  })
}

export function deletePermissionApi(data) {
  return request({
    url: url.deletePermissionUrl,
    method: 'post',
    data
  })
}

export function getPermissionListApi(data) {
  return request({
    url: url.getPermissionListUrl,
    method: 'get',
    params: data
  })
}

export function getPermissionApi(data) {
  return request({
    url: url.getPermissionUrl,
    method: 'get',
    params: data
  })
}
