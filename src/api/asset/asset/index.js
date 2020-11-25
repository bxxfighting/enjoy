import request from '@/utils/request'
import url from './url'

export function createAssetApi(data) {
  return request({
    url: url.createAssetUrl,
    method: 'post',
    data
  })
}

export function updateAssetApi(data) {
  return request({
    url: url.updateAssetUrl,
    method: 'post',
    data
  })
}

export function deleteAssetApi(data) {
  return request({
    url: url.deleteAssetUrl,
    method: 'post',
    data
  })
}

export function getAssetListApi(data) {
  return request({
    url: url.getAssetListUrl,
    method: 'post',
    data
  })
}

export function getAssetApi(data) {
  return request({
    url: url.getAssetUrl,
    method: 'post',
    data
  })
}
