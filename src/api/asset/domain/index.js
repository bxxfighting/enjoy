import request from '@/utils/request'
import url from './url'

export function getDomainListApi(data) {
  return request({
    url: url.getDomainListUrl,
    method: 'get',
    data
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
    data
  })
}

export function getDomainRecordListApi(data) {
  return request({
    url: url.getDomainRecordListUrl,
    method: 'get',
    data
  })
}

export function getDomainRecordApi(data) {
  return request({
    url: url.getDomainRecordUrl,
    method: 'get',
    data
  })
}

export function getDomainServiceListApi(data) {
  return request({
    url: url.getDomainServiceListUrl,
    method: 'get',
    data
  })
}
