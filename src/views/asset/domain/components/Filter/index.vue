<template>
  <div class="filter-container">
    <el-input v-model="keyword_" placeholder="域名/解析地址" style="width: 300px;" clearable class="filter-item" @change="keywordChange" />
  </div>
</template>

<script>
export default {
  name: 'DomainFilter',
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
