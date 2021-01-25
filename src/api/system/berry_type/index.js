import request from '@/utils/request'
import url from './url'

export function createBerryTypeApi(data) {
  return request({
    url: url.createBerryTypeUrl,
    method: 'post',
    data
  })
}

export function updateBerryTypeApi(data) {
  return request({
    url: url.updateBerryTypeUrl,
    method: 'post',
    data
  })
}

export function deleteBerryTypeApi(data) {
  return request({
    url: url.deleteBerryTypeUrl,
    method: 'post',
    data
  })
}

export function getBerryTypeListApi(data) {
  return request({
    url: url.getBerryTypeListUrl,
    method: 'get',
    params: data
  })
}

export function getBerryTypeApi(data) {
  return request({
    url: url.getBerryTypeUrl,
    method: 'get',
    params: data
  })
}
