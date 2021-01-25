import request from '@/utils/request'
import url from './url'

export function getSlbListApi(data) {
  return request({
    url: url.getSlbListUrl,
    method: 'get',
    params: data
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
    params: data
  })
}

export function getSlbServerGroupListApi(data) {
  return request({
    url: url.getSlbServerGroupListUrl,
    method: 'get',
    params: data
  })
}

export function getSlbServerGroupApi(data) {
  return request({
    url: url.getSlbServerGroupUrl,
    method: 'get',
    params: data
  })
}

export function getSlbServerGroupEcsListApi(data) {
  return request({
    url: url.getSlbServerGroupEcsListUrl,
    method: 'get',
    params: data
  })
}

export function getSlbServerGroupServiceListApi(data) {
  return request({
    url: url.getSlbServerGroupServiceListUrl,
    method: 'get',
    params: data
  })
}

export function getSlbDomainListApi(data) {
  return request({
    url: url.getSlbDomainListUrl,
    method: 'get',
    params: data
  })
}
