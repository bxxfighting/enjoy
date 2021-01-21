<template>
  <el-select
    v-model="obj.value"
    style="width: 200px"
    placeholder="解析类型"
    @change="changeObj"
  >
    <el-option
      v-for="item in dns_typ.dataList"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'DnsTypField',
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
      dns_typ: {
        dataList: [
          { name: '无解析', value: 'none' },
          { name: '解析至ECS', value: 'ecs' },
          { name: '解析至SLB', value: 'slb' }
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
