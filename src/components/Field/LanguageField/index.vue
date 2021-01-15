<template>
  <el-select v-model="obj_id" placeholder="请选择编程语言" @change="changeObj">
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
  getLanguageListApi as getObjListApi
} from '@/api/business/service'

export default {
  name: 'LanguageField',
  props: {
    objId: {
      type: Number,
      default: null
    },
    regain: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      obj_id: this.objId,
      obj: {
        dataList: [],
        filter: {
        }
      }
    }
  },
  watch: {
    objId: function() {
      this.obj_id = this.objId
    },
    regain: function() {
      if (this.regain === true) {
        this.getObjList()
      }
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
            this.$emit('update:regain', false)
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
