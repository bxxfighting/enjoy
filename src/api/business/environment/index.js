import request from '@/utils/request'
import url from './url'

export function createEnvironmentApi(data) {
  return request({
    url: url.createEnvironmentUrl,
    method: 'post',
    data
  })
}

export function updateEnvironmentApi(data) {
  return request({
    url: url.updateEnvironmentUrl,
    method: 'post',
    data
  })
}

export function deleteEnvironmentApi(data) {
  return request({
    url: url.deleteEnvironmentUrl,
    method: 'post',
    data
  })
}

export function getEnvironmentListApi(data) {
  return request({
    url: url.getEnvironmentListUrl,
    method: 'get',
    data
  })
}

export function getEnvironmentApi(data) {
  return request({
    url: url.getEnvironmentUrl,
    method: 'get',
    data
  })
}
