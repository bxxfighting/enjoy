<template>
  <el-autocomplete
    v-model="obj.filter.keyword"
    :value="obj.filter.keyword"
    :fetch-suggestions="searchObj"
    placeholder="请输入关键字搜索"
    clearable
    @select="selectObj"
  />
</template>

<script>
import {
  getMongoListApi as getObjListApi
} from '@/api/asset/mongo'

export default {
  name: 'MongoField',
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
          keyword: '',
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
      this.obj.filter.keyword = ''
      this.$emit('update:regain', false)
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
                value: item.name + '(' + item.instance_id + ')',
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
      this.$emit('update:objId', parseInt(item.id))
    }
  }
}
</script>
