import request from '@/utils/request'
import url from './url'

export function getMongoListApi(data) {
  return request({
    url: url.getMongoListUrl,
    method: 'get',
    data
  })
}

export function syncMongoApi(data) {
  return request({
    url: url.syncMongoUrl,
    method: 'post',
    data
  })
}

export function getMongoApi(data) {
  return request({
    url: url.getMongoUrl,
    method: 'get',
    data
  })
}

export function getMongoAccountListApi(data) {
  return request({
    url: url.getMongoAccountListUrl,
    method: 'get',
    data
  })
}

export function getMongoAccountApi(data) {
  return request({
    url: url.getMongoAccountUrl,
    method: 'get',
    data
  })
}

export function updateMongoAccountApi(data) {
  return request({
    url: url.updateMongoAccountUrl,
    method: 'post',
    data
  })
}

export function getMongoServiceListApi(data) {
  return request({
    url: url.getMongoServiceListUrl,
    method: 'get',
    data
  })
}
