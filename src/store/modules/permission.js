import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param mods
 * @param route
 */
function hasPermission(mods, route) {
  if (route.meta && route.meta.sign) {
    return mods.includes(route.meta.sign)
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param mods
 */
export function filterAsyncRoutes(routes, mods) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    const children = tmp.children
    if (hasPermission(mods, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, mods)
      }
      if (children) {
        if (tmp.children.length > 0) {
          res.push(tmp)
        }
      } else {
        res.push(tmp)
      }
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, mods) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, mods)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
