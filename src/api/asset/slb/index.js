import request from '@/utils/request'
import url from './url'

export function getSlbListApi(data) {
  return request({
    url: url.getSlbListUrl,
    method: 'get',
    data
  })
}

export function syncSlbApi(data) {
  return request({
    url: url.syncSlbUrl,
    method: 'post',
    data
  })
}

export function getSlbApi(data) {
  return request({
    url: url.getSlbUrl,
    method: 'get',
    data
  })
}

export function getSlbServerGroupListApi(data) {
  return request({
    url: url.getSlbServerGroupListUrl,
    method: 'get',
    data
  })
}

export function getSlbServerGroupApi(data) {
  return request({
    url: url.getSlbServerGroupUrl,
    method: 'get',
    data
  })
}

export function getSlbServerGroupEcsListApi(data) {
  return request({
    url: url.getSlbServerGroupEcsListUrl,
    method: 'get',
    data
  })
}

export function getSlbServerGroupServiceListApi(data) {
  return request({
    url: url.getSlbServerGroupServiceListUrl,
    method: 'get',
    data
  })
}

export function getSlbDomainListApi(data) {
  return request({
    url: url.getSlbDomainListUrl,
    method: 'get',
    data
  })
}
