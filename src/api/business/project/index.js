import request from '@/utils/request'
import url from './url'

export function createProjectApi(data) {
  return request({
    url: url.createProjectUrl,
    method: 'post',
    data
  })
}

export function updateProjectApi(data) {
  return request({
    url: url.updateProjectUrl,
    method: 'post',
    data
  })
}

export function deleteProjectApi(data) {
  return request({
    url: url.deleteProjectUrl,
    method: 'post',
    data
  })
}

export function getProjectListApi(data) {
  return request({
    url: url.getProjectListUrl,
    method: 'post',
    data
  })
}

export function getProjectApi(data) {
  return request({
    url: url.getProjectUrl,
    method: 'post',
    data
  })
}

export function createProjectUserApi(data) {
  return request({
    url: url.createProjectUserUrl,
    method: 'post',
    data
  })
}

export function updateProjectUserApi(data) {
  return request({
    url: url.updateProjectUserUrl,
    method: 'post',
    data
  })
}

export function deleteProjectUserApi(data) {
  return request({
    url: url.deleteProjectUserUrl,
    method: 'post',
    data
  })
}

export function getProjectUserListApi(data) {
  return request({
    url: url.getProjectUserListUrl,
    method: 'post',
    data
  })
}
