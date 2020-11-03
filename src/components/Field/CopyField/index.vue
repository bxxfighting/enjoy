<template>
  <span>
    {{ value }}
    <el-button
      v-show="value!==''"
      v-clipboard:copy="value"
      v-clipboard:success="clipboardSuccess"
      type="text"
      size="mini"
      icon="el-icon-document-copy"
    />
  </span>
</template>

<script>
import clipboard from '@/directive/clipboard/index.js'
export default {
  name: 'CopyField',
  directives: { clipboard },
  props: {
    value: {
      required: true,
      type: String
    }
  },
  methods: {
    clipboardSuccess() {
      this.$notify({
        message: '复制成功',
        type: 'success',
        duration: 1000
      })
    }
  }
}
</script>
