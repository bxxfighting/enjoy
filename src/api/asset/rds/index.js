import request from '@/utils/request'
import url from './url'

export function getRdsListApi(data) {
  return request({
    url: url.getRdsListUrl,
    method: 'post',
    data
  })
}

export function getRdsApi(data) {
  return request({
    url: url.getRdsUrl,
    method: 'post',
    data
  })
}

export function getRdsDatabaseListApi(data) {
  return request({
    url: url.getRdsDatabaseListUrl,
    method: 'post',
    data
  })
}

export function getRdsDatabaseApi(data) {
  return request({
    url: url.getRdsDatabaseUrl,
    method: 'post',
    data
  })
}

export function getRdsDatabaseAccountListApi(data) {
  return request({
    url: url.getRdsDatabaseAccountListUrl,
    method: 'post',
    data
  })
}

export function getRdsAccountListApi(data) {
  return request({
    url: url.getRdsAccountListUrl,
    method: 'post',
    data
  })
}

export function getRdsAccountApi(data) {
  return request({
    url: url.getRdsAccountUrl,
    method: 'post',
    data
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
    method: 'post',
    data
  })
}
