import request from '@/utils/request'
import url from './url'

export function createAliyunKeyApi(data) {
  return request({
    url: url.createAliyunKeyUrl,
    method: 'post',
    data
  })
}

export function updateAliyunKeyApi(data) {
  return request({
    url: url.updateAliyunKeyUrl,
    method: 'post',
    data
  })
}

export function deleteAliyunKeyApi(data) {
  return request({
    url: url.deleteAliyunKeyUrl,
    method: 'post',
    data
  })
}

export function setAliyunKeyStatusApi(data) {
  return request({
    url: url.setAliyunKeyStatusUrl,
    method: 'post',
    data
  })
}

export function getAliyunKeyListApi(data) {
  return request({
    url: url.getAliyunKeyListUrl,
    method: 'get',
    data
  })
}

export function getAliyunKeyApi(data) {
  return request({
    url: url.getAliyunKeyUrl,
    method: 'get',
    data
  })
}
