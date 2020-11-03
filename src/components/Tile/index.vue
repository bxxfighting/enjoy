<template>
  <el-form :inline="true">
    <el-row v-for="(item,index) in fields" :key="item.name" class="tile">
      <slot v-if="index<fields.length&&index%3==0">
        <el-col :span="8">
          <el-form-item :label="item.name">
            <CopyField :value="item.value" />
          </el-form-item>
        </el-col>
        <el-col v-if="index<fields.length-1" :span="8">
          <el-form-item :label="fields[index+1].name">
            <CopyField :value="fields[index+1].value" />
          </el-form-item>
        </el-col>
        <el-col v-if="index<fields.length-2" :span="8">
          <el-form-item :label="fields[index+2].name">
            <CopyField :value="fields[index+2].value" />
          </el-form-item>
        </el-col>
      </slot>
    </el-row>
  </el-form>
</template>

<script>
import CopyField from '@/components/Field/CopyField'
export default {
  name: 'Tile',
  components: { CopyField },
  props: {
    fields: {
      required: true,
      type: Array
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

<style>
.tile label {
  color: #99a9bf;
}
</style>
