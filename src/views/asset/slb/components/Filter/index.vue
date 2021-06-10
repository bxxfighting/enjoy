<template>
  <div class="filter-container">
    <el-input v-model="keyword_" placeholder="IP/实例ID/名称" style="width: 300px;" clearable class="filter-item" @change="keywordChange" />
  </div>
</template>

<script>
export default {
  name: 'SlbFilter',
  props: {
    keyword: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      keyword_: this.keyword
    }
  },
  created() {
  },
  activated() {
  },
  methods: {
    keywordChange() {
      this.$emit('update:keyword', this.keyword_)
      this.$emit('change')
    }
  }
}
</script>
