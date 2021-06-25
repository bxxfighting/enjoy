<template>
  <div>
    <div>
      <el-row>
        <el-col :span="20">
          <slot name="header" />
        </el-col>
        <el-col :span="4">
          <el-button v-if="$slots.body" :icon="icon" type="text" size="small" style="float: right; padding: 3px 10px;" @click="changeStatus" />
        </el-col>
      </el-row>
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <slot name="body" />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'FilterPanel',
  props: {
  },
  data() {
    return {
      icon: 'el-icon-arrow-down',
      status: 'down',
      show: false
    }
  },
  created() {
  },
  activated() {
  },
  methods: {
    changeStatus() {
      if (this.status === 'up') {
        this.status = 'down'
        this.icon = 'el-icon-arrow-down'
        this.show = false
      } else {
        this.status = 'up'
        this.icon = 'el-icon-arrow-up'
        this.show = true
      }
    }
  }
}
</script>

<style>
.el-form-item {
  margin-bottom: 0px;
}
.el-form--inline .el-form-item{
  margin-right: 0px;
}
</style>

