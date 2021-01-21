<template>
  <el-select
    v-model="obj.value"
    style="width: 200px"
    placeholder="部署类型"
    @change="changeObj"
  >
    <el-option
      v-for="item in deploy_typ.dataList"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'DeployTypField',
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
      deploy_typ: {
        dataList: [
          { name: 'ECS部署', value: 'ecs' },
          { name: 'K8s部署', value: 'k8s' }
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
