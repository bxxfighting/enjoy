<template>
  <el-select v-model="obj_id" placeholder="请选择环境" @change="changeObj">
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
  getServiceEnvironmentListApi as getObjListApi
} from '@/api/business/service'

export default {
  name: 'EnvironmentField',
  props: {
    environmentId: {
      type: Number,
      default: null
    },
    serviceId: {
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
      obj_id: this.environmentId,
      obj: {
        dataList: [],
        filter: {
          obj_id: this.serviceId
        }
      }
    }
  },
  watch: {
    environmentId: function() {
      this.obj_id = this.environmentId
    },
    serviceId: function() {
      this.obj.filter.obj_id = this.serviceId
    },
    regain: function() {
      if (this.regain === true) {
        this.$emit('update:regain', false)
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
            this.$emit('update:environmentId', parseInt(this.obj_id))
          }
        }
      })
    },
    changeObj(obj_id) {
      this.$emit('update:environmentId', parseInt(obj_id))
    }
  }
}
</script>
