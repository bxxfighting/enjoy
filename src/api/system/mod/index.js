import request from '@/utils/request'
import url from './url'

export function createModApi(data) {
  return request({
    url: url.createModUrl,
    method: 'post',
    data
  })
}

export function updateModApi(data) {
  return request({
    url: url.updateModUrl,
    method: 'post',
    data
  })
}

export function deleteModApi(data) {
  return request({
    url: url.deleteModUrl,
    method: 'post',
    data
  })
}

export function getModListApi(data) {
  return request({
    url: url.getModListUrl,
    method: 'get',
    params: data
  })
}

export function getModApi(data) {
  return request({
    url: url.getModUrl,
    method: 'get',
    params: data
  })
}
