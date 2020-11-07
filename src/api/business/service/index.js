import request from '@/utils/request'
import url from './url'

export function createServiceApi(data) {
  return request({
    url: url.createServiceUrl,
    method: 'post',
    data
  })
}

export function updateServiceApi(data) {
  return request({
    url: url.updateServiceUrl,
    method: 'post',
    data
  })
}

export function deleteServiceApi(data) {
  return request({
    url: url.deleteServiceUrl,
    method: 'post',
    data
  })
}

export function getServiceListApi(data) {
  return request({
    url: url.getServiceListUrl,
    method: 'post',
    data
  })
}

export function getServiceApi(data) {
  return request({
    url: url.getServiceUrl,
    method: 'post',
    data
  })
}

export function createServiceUserApi(data) {
  return request({
    url: url.createServiceUserUrl,
    method: 'post',
    data
  })
}

export function updateServiceUserApi(data) {
  return request({
    url: url.updateServiceUserUrl,
    method: 'post',
    data
  })
}

export function deleteServiceUserApi(data) {
  return request({
    url: url.deleteServiceUserUrl,
    method: 'post',
    data
  })
}

export function getServiceUserListApi(data) {
  return request({
    url: url.getServiceUserListUrl,
    method: 'post',
    data
  })
}