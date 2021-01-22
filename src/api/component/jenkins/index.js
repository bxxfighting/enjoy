import request from '@/utils/request'
import url from './url'

export function createJenkinsServerApi(data) {
  return request({
    url: url.createJenkinsServerUrl,
    method: 'post',
    data
  })
}

export function updateJenkinsServerApi(data) {
  return request({
    url: url.updateJenkinsServerUrl,
    method: 'post',
    data
  })
}

export function deleteJenkinsServerApi(data) {
  return request({
    url: url.deleteJenkinsServerUrl,
    method: 'post',
    data
  })
}

export function getJenkinsServerListApi(data) {
  return request({
    url: url.getJenkinsServerListUrl,
    method: 'post',
    data
  })
}

export function getJenkinsServerApi(data) {
  return request({
    url: url.getJenkinsServerUrl,
    method: 'post',
    data
  })
}

export function getJenkinsJobListApi(data) {
  return request({
    url: url.getJenkinsJobListUrl,
    method: 'post',
    data
  })
}

export function syncJenkinsJobApi(data) {
  return request({
    url: url.syncJenkinsJobUrl,
    method: 'post',
    data
  })
}
