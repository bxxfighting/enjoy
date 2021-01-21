<template>
  <el-select
    v-model="obj.value"
    style="width: 200px"
    placeholder="制品类型"
    @change="changeObj"
  >
    <el-option
      v-for="item in artifact_typ.dataList"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'ArtifactTypField',
  props: {
    value: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      obj: {
        value: this.value
      },
      artifact_typ: {
        dataList: [
          { name: 'Git源码', value: 'git' },
          { name: '压缩包', value: 'archive' },
          { name: 'Docker镜像', value: 'docker' }
        ]
      }
    }
  },
  watch: {
    value: function() {
      this.obj.value = this.value
    }
  },
  methods: {
    changeObj(value) {
      this.$emit('update:value', value)
    }
  }
}
</script>
