import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const permissions = store.getters && store.getters.permissions

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const bindPermissions = value

      // 这里permissions.includes('admin')，超级管理员用户，默认会有一个admin权限，所以当permissions中包含admin权限时，就拥有所有权限
      const hasPermission = permissions.includes('admin') || permissions.some(permission => {
        return bindPermissions.includes(permission)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need permissions! Like v-permission="['/api/v1/create/','/api/v1/update/']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
