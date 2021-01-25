import request from '@/utils/request'
import url from './url'

export function updateLdapConfigApi(data) {
  return request({
    url: url.updateLdapConfigUrl,
    method: 'post',
    data
  })
}

export function getLdapConfigApi(data) {
  return request({
    url: url.getLdapConfigUrl,
    method: 'get',
    params: data
  })
}

export function syncLdapUserApi(data) {
  return request({
    url: url.syncLdapUserUrl,
    method: 'post',
    data
  })
}
