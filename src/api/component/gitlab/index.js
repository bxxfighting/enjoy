import request from '@/utils/request'
import url from './url'

export function createGitlabServerApi(data) {
  return request({
    url: url.createGitlabServerUrl,
    method: 'post',
    data
  })
}

export function updateGitlabServerApi(data) {
  return request({
    url: url.updateGitlabServerUrl,
    method: 'post',
    data
  })
}

export function deleteGitlabServerApi(data) {
  return request({
    url: url.deleteGitlabServerUrl,
    method: 'post',
    data
  })
}

export function getGitlabServerListApi(data) {
  return request({
    url: url.getGitlabServerListUrl,
    method: 'post',
    data
  })
}

export function getGitlabServerApi(data) {
  return request({
    url: url.getGitlabServerUrl,
    method: 'post',
    data
  })
}

export function getGitlabProjectListApi(data) {
  return request({
    url: url.getGitlabProjectListUrl,
    method: 'post',
    data
  })
}

export function syncGitlabProjectApi(data) {
  return request({
    url: url.syncGitlabProjectUrl,
    method: 'post',
    data
  })
}
