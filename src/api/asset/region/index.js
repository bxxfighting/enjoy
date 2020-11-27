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
    method: 'post',
    data
  })
}

export function getRegionApi(data) {
  return request({
    url: url.getRegionUrl,
    method: 'post',
    data
  })
}

export function getZoneListApi(data) {
  return request({
    url: url.getZoneListUrl,
    method: 'post',
    data
  })
}

export function getZoneApi(data) {
  return request({
    url: url.getZoneUrl,
    method: 'post',
    data
  })
}
