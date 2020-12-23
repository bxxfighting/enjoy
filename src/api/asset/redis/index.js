import request from '@/utils/request'
import url from './url'

export function getRedisListApi(data) {
  return request({
    url: url.getRedisListUrl,
    method: 'post',
    data
  })
}

export function getRedisApi(data) {
  return request({
    url: url.getRedisUrl,
    method: 'post',
    data
  })
}

export function getRedisAccountListApi(data) {
  return request({
    url: url.getRedisAccountListUrl,
    method: 'post',
    data
  })
}

export function getRedisAccountApi(data) {
  return request({
    url: url.getRedisAccountUrl,
    method: 'post',
    data
  })
}

export function updateRedisAccountApi(data) {
  return request({
    url: url.updateRedisAccountUrl,
    method: 'post',
    data
  })
}

export function getRedisServiceListApi(data) {
  return request({
    url: url.getRedisServiceListUrl,
    method: 'post',
    data
  })
}
