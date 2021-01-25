import request from '@/utils/request'
import url from './url'

export function createDepartmentApi(data) {
  return request({
    url: url.createDepartmentUrl,
    method: 'post',
    data
  })
}

export function updateDepartmentApi(data) {
  return request({
    url: url.updateDepartmentUrl,
    method: 'post',
    data
  })
}

export function deleteDepartmentApi(data) {
  return request({
    url: url.deleteDepartmentUrl,
    method: 'post',
    data
  })
}

export function getDepartmentListApi(data) {
  return request({
    url: url.getDepartmentListUrl,
    method: 'get',
    params: data
  })
}

export function getDepartmentApi(data) {
  return request({
    url: url.getDepartmentUrl,
    method: 'get',
    params: data
  })
}

export function createDepartmentUserApi(data) {
  return request({
    url: url.createDepartmentUserUrl,
    method: 'post',
    data
  })
}

export function deleteDepartmentUserApi(data) {
  return request({
    url: url.deleteDepartmentUserUrl,
    method: 'post',
    data
  })
}

export function getDepartmentUserListApi(data) {
  return request({
    url: url.getDepartmentUserListUrl,
    method: 'get',
    params: data
  })
}

export function getDepartmentServiceListApi(data) {
  return request({
    url: url.getDepartmentServiceListUrl,
    method: 'get',
    params: data
  })
}
