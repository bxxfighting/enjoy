import request from '@/utils/request'
import url from './url'

export function getRocketListApi(data) {
  return request({
    url: url.getRocketListUrl,
    method: 'get',
    params: data
  })
}

export function syncRocketApi(data) {
  return request({
    url: url.syncRocketUrl,
    method: 'post',
    data
  })
}

export function getRocketApi(data) {
  return request({
    url: url.getRocketUrl,
    method: 'get',
    params: data
  })
}

export function getRocketTopicListApi(data) {
  return request({
    url: url.getRocketTopicListUrl,
    method: 'get',
    params: data
  })
}

export function getRocketTopicApi(data) {
  return request({
    url: url.getRocketTopicUrl,
    method: 'get',
    params: data
  })
}

export function getRocketGroupListApi(data) {
  return request({
    url: url.getRocketGroupListUrl,
    method: 'post',
    params: data
  })
}

export function getRocketGroupApi(data) {
  return request({
    url: url.getRocketGroupUrl,
    method: 'post',
    params: data
  })
}
