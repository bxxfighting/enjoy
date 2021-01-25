import request from '@/utils/request'
import url from './url'

export function setRegionStatusApi(data) {
  return request({
    url: url.setRegionStatusUrl,
    method: 'post',
    data
  })
}

export function getRegionListApi(data) {
  return request({
    url: url.getRegionListUrl,
    method: 'get',
    params: data
  })
}

export function getRegionApi(data) {
  return request({
    url: url.getRegionUrl,
    method: 'get',
    params: data
  })
}

export function getZoneListApi(data) {
  return request({
    url: url.getZoneListUrl,
    method: 'get',
    params: data
  })
}

export function getZoneApi(data) {
  return request({
    url: url.getZoneUrl,
    method: 'get',
    params: data
  })
}
