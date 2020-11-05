import store from '@/store'

export default function checkPermission(value) {
  const permissions = store.getters && store.getters.permissions

  let hasPermission = false
  if (value) {
    if (value.constructor === String) {
      hasPermission = permissions.includes('admin') || permissions.includes(value)
    } else if (value.constructor === Array) {
      hasPermission = permissions.includes('admin') || value.some(role => { return permissions.includes(role) })
    }
  }

  return hasPermission
}
