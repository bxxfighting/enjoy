import request from '@/utils/request'
import url from './url'

export function getRdsListApi(data) {
  return request({
    url: url.getRdsListUrl,
    method: 'get',
    params: data
  })
}

export function syncRdsApi(data) {
  return request({
    url: url.syncRdsUrl,
    method: 'post',
    data
  })
}

export function getRdsApi(data) {
  return request({
    url: url.getRdsUrl,
    method: 'get',
    params: data
  })
}

export function getRdsDatabaseListApi(data) {
  return request({
    url: url.getRdsDatabaseListUrl,
    method: 'get',
    params: data
  })
}

export function getRdsDatabaseApi(data) {
  return request({
    url: url.getRdsDatabaseUrl,
    method: 'get',
    params: data
  })
}

export function getRdsDatabaseAccountListApi(data) {
  return request({
    url: url.getRdsDatabaseAccountListUrl,
    method: 'get',
    params: data
  })
}

export function getRdsAccountListApi(data) {
  return request({
    url: url.getRdsAccountListUrl,
    method: 'get',
    params: data
  })
}

export function getRdsAccountApi(data) {
  return request({
    url: url.getRdsAccountUrl,
    method: 'get',
    params: data
  })
}

export function updateRdsAccountApi(data) {
  return request({
    url: url.updateRdsAccountUrl,
    method: 'post',
    data
  })
}

export function getRdsAccountDatabaseListApi(data) {
  return request({
    url: url.getRdsAccountDatabaseListUrl,
    method: 'get',
    params: data
  })
}

export function getRdsDatabaseServiceListApi(data) {
  return request({
    url: url.getRdsDatabaseServiceListUrl,
    method: 'get',
    params: data
  })
}
