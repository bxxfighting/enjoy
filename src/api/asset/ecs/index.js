import request from '@/utils/request'
import url from './url'

export function getEcsListApi(data) {
  return request({
    url: url.getEcsListUrl,
    method: 'post',
    data
  })
}

export function syncEcsApi(data) {
  return request({
    url: url.syncEcsUrl,
    method: 'post',
    data
  })
}

export function getEcsApi(data) {
  return request({
    url: url.getEcsUrl,
    method: 'post',
    data
  })
}

export function getEcsServiceListApi(data) {
  return request({
    url: url.getEcsServiceListUrl,
    method: 'post',
    data
  })
}

export function getEcsDomainListApi(data) {
  return request({
    url: url.getEcsDomainListUrl,
    method: 'post',
    data
  })
}
