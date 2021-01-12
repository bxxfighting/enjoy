import request from '@/utils/request'
import url from './url'

export function getSlbListApi(data) {
  return request({
    url: url.getSlbListUrl,
    method: 'post',
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
    method: 'post',
    data
  })
}

export function getSlbServerGroupListApi(data) {
  return request({
    url: url.getSlbServerGroupListUrl,
    method: 'post',
    data
  })
}

export function getSlbServerGroupApi(data) {
  return request({
    url: url.getSlbServerGroupUrl,
    method: 'post',
    data
  })
}

export function getSlbServerGroupEcsListApi(data) {
  return request({
    url: url.getSlbServerGroupEcsListUrl,
    method: 'post',
    data
  })
}

export function getSlbServerGroupServiceListApi(data) {
  return request({
    url: url.getSlbServerGroupServiceListUrl,
    method: 'post',
    data
  })
}

export function getSlbDomainListApi(data) {
  return request({
    url: url.getSlbDomainListUrl,
    method: 'post',
    data
  })
}
