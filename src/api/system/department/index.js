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
    method: 'post',
    data
  })
}

export function getDepartmentApi(data) {
  return request({
    url: url.getDepartmentUrl,
    method: 'post',
    data
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
    method: 'post',
    data
  })
}

export function getDepartmentServiceListApi(data) {
  return request({
    url: url.getDepartmentServiceListUrl,
    method: 'post',
    data
  })
}
