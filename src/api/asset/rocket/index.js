import request from '@/utils/request'
import url from './url'

export function getRocketListApi(data) {
  return request({
    url: url.getRocketListUrl,
    method: 'post',
    data
  })
}

export function getRocketApi(data) {
  return request({
    url: url.getRocketUrl,
    method: 'post',
    data
  })
}

export function getRocketTopicListApi(data) {
  return request({
    url: url.getRocketTopicListUrl,
    method: 'post',
    data
  })
}

export function getRocketTopicApi(data) {
  return request({
    url: url.getRocketTopicUrl,
    method: 'post',
    data
  })
}

export function getRocketGroupListApi(data) {
  return request({
    url: url.getRocketGroupListUrl,
    method: 'post',
    data
  })
}

export function getRocketGroupApi(data) {
  return request({
    url: url.getRocketGroupUrl,
    method: 'post',
    data
  })
}
