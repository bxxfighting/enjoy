<template>
  <el-select v-model="obj_id" @change="changeObj" >
    <el-option
      v-for="item in obj.dataList"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import {
  getRoleListApi as getObjListApi
} from '@/api/system/role'

export default {
  name: 'RoleField',
  props: {
    objId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      obj_id: parseInt(this.objId),
      obj: {
        dataList: [],
        filter: {
        }
      }
    }
  },
  watch: {
    objId: function() {
      this.obj_id = parseInt(this.objId)
    }
  },
  created() {
    this.getObjList()
  },
  activated() {
    this.getObjList()
  },
  methods: {
    getObjList() {
      const filter = this.obj.filter
      getObjListApi(filter).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          if (this.obj.dataList.length > 0) {
            this.obj_id = this.obj.dataList[0].id
            this.$emit('update:objId', this.obj_id)
          }
        }
      })
    },
    changeObj(obj_id) {
      this.$emit('update:objId', obj_id)
    }
  }
}
</script>
