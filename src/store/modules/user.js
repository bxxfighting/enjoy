import { login, logout, getInfo } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  id: null,
  name: '',
  mods: [],
  permissions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MODS: (state, mods) => {
    state.mods = mods
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, is_ldap } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, is_ldap: is_ldap }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { mods, permissions, user } = data

        commit('SET_MODS', mods)
        commit('SET_PERMISSIONS', permissions)
        commit('SET_NAME', user.name)
        commit('SET_ID', user.id)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_MODS', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_ID', null)
        commit('SET_NAME', '')
        removeToken()
        resetRouter()

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MODS', [])
      commit('SET_PERMISSIONS', [])
      commit('SET_ID', null)
      commit('SET_NAME', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
