<template>
  <el-autocomplete
    v-model="obj.filter.rocket_instance_id"
    style="width: 100%"
    :value="obj.filter.rocket_instance_id"
    :fetch-suggestions="searchObj"
    placeholder="请输入Rocket实例ID搜索"
    clearable
    @select="selectObj"
  />
</template>

<script>
import {
  getRocketTopicListApi as getObjListApi
} from '@/api/asset/rocket'

export default {
  name: 'RocketTopicField',
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
          rocket_instance_id: '',
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
      this.obj.filter.rocket_instance_id = ''
      this.$emit('update:regain', false)
    }
  },
  methods: {
    searchObj(rocket_instance_id, cb) {
      if (rocket_instance_id === '') {
        return
      }
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
    }
  }
}
</script>
