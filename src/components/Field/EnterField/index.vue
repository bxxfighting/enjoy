<template>
  <span
    style="white-space: pre"
    v-html="formatValue(value)"
  />
</template>

<script>
// 此字段用于正确展示带有回车的文本
export default {
  name: 'EnterField',
  props: {
    value: {
      required: true,
      type: String
    }
  },
  methods: {
    formatValue(val) {
      return val.replace(/\n/g, '<br/>')
    }
  }
}
</script>
