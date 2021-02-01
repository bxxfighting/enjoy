import request from '@/utils/request'
import url from './url'

export function updateJenkinsServerApi(data) {
  return request({
    url: url.updateJenkinsServerUrl,
    method: 'post',
    data
  })
}

export function getJenkinsServerApi(data) {
  return request({
    url: url.getJenkinsServerUrl,
    method: 'get',
    params: data
  })
}

export function getJenkinsJobListApi(data) {
  return request({
    url: url.getJenkinsJobListUrl,
    method: 'get',
    params: data
  })
}

export function syncJenkinsJobApi(data) {
  return request({
    url: url.syncJenkinsJobUrl,
    method: 'post',
    data
  })
}
