<template>
  <el-autocomplete
    v-model="obj.filter.keyword"
    :fetch-suggestions="searchObj"
    placeholder="请输入关键字搜索用户"
    clearable
    @select="selectObj"
  />
</template>

<script>
import {
  getUserListApi as getObjListApi
} from '@/api/system/user'

export default {
  name: 'UserField',
  props: {
    objId: {
      type: Number,
      default: null
    },
    objName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      obj_id: this.objId,
      obj_name: this.objName,
      obj: {
        dataList: [],
        timeout: null,
        filter: {
          keyword: this.obj_name,
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
    objName: function() {
      this.obj_name = this.objName
    }
  },
  methods: {
    searchObj(keyword, cb) {
      clearTimeout(this.obj.timeout)
      this.obj.timeout = setTimeout(() => {
        const filter = this.obj.filter

        getObjListApi(filter).then(resp => {
          if (resp.code === 0) {
            const objList = resp.data.data_list.map(function(item) {
              const data = {
                value: item.name,
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
      this.$emit('update:objName', item.value)
    }
  }
}
</script>
