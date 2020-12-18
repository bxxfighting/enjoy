export function getValue(data, key) {
  let tmp = data
  const keys = key.split('.')
  let value = ''
  const len = String(keys.length - 1)
  for (const i in keys) {
    if (i === len) {
      value = tmp[keys[i]]
      return value
    } else {
      tmp = tmp[keys[i]]
    }
  }
}
