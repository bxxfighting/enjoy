<template>
  <el-autocomplete
    v-model="obj.filter.slb_instance_id"
    :value="obj.filter.slb_instance_id"
    :fetch-suggestions="searchObj"
    placeholder="请输入SLB实例ID搜索"
    clearable
    @select="selectObj"
  />
</template>

<script>
import {
  getSlbServerGroupListApi as getObjListApi
} from '@/api/asset/slb'

export default {
  name: 'SlbServerGroupField',
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
        timeout: null,
        filter: {
          slb_instance_id: '',
          page_num: 1,
          page_size: 20
        }
      }
    }
  },
  watch: {
    objId: function() {
      this.obj_id = this.objId
    },
    regain: function() {
      this.obj.filter.slb_instance_id = ''
      this.$emit('update:regain', false)
    }
  },
  methods: {
    searchObj(slb_instance_id, cb) {
      clearTimeout(this.obj.timeout)
      this.obj.timeout = setTimeout(() => {
        const filter = this.obj.filter

        getObjListApi(filter).then(resp => {
          if (resp.code === 0) {
            const objList = resp.data.data_list.map(function(item) {
              const data = {
                value: item.name + '(' + item.typ_desc + ')',
                id: item.id
              }
              return data
            })
            cb(objList)
          }
        })
      }, 500)
    },
    selectObj(item) {
      this.$emit('update:objId', item.id)
    }
  }
}
</script>
