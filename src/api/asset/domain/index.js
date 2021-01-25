import request from '@/utils/request'
import url from './url'

export function getDomainListApi(data) {
  return request({
    url: url.getDomainListUrl,
    method: 'get',
    params: data
  })
}

export function syncDomainApi(data) {
  return request({
    url: url.syncDomainUrl,
    method: 'post',
    data
  })
}

export function getDomainApi(data) {
  return request({
    url: url.getDomainUrl,
    method: 'get',
    params: data
  })
}

export function getDomainRecordListApi(data) {
  return request({
    url: url.getDomainRecordListUrl,
    method: 'get',
    params: data
  })
}

export function getDomainRecordApi(data) {
  return request({
    url: url.getDomainRecordUrl,
    method: 'get',
    params: data
  })
}

export function getDomainServiceListApi(data) {
  return request({
    url: url.getDomainServiceListUrl,
    method: 'get',
    params: data
  })
}
