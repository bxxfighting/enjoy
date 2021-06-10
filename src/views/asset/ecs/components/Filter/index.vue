<template>
  <div class="filter-container">
    <el-input v-model="keyword_" placeholder="实例ID/hostname/内网IP" style="width: 300px;" clearable class="filter-item" @change="keywordChange" />
  </div>
</template>

<script>
export default {
  name: 'EcsFilter',
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
