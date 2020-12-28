<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}</span>
      <el-link class="el-icon-link" :href="obj.web_url" target="_blank" />
    </div>
    <Tile :fields="obj.fields" />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/rocket/url'
import {
  getRocketApi as getObjApi
} from '@/api/asset/rocket'

export default {
  name: 'BaseInfo',
  components: { Tile },
  directives: { permission },
  props: {
    objId: {
      required: true,
      type: Number
    }
  },
  data() {
    return {
      url,
      obj: {
        loading: false,
        form: {
          show: false,
          status: 'update'
        },
        name: '',
        web_url: '',
        fields: [
          { name: '实例ID', sign: 'instance_id', value: '' },
          { name: '是否命名独立空间', sign: 'is_independent_naming', value: '' },
          { name: '地域', sign: 'region_id', value: '' }
        ]
      }
    }
  },
  created() {
    this.getObj()
  },
  activated() {
    this.getObj()
  },
  methods: {
    getObj() {
      this.obj.loading = true
      const data = {
        obj_id: parseInt(this.objId)
      }
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.name = resp.data.name
          this.obj.web_url = resp.data.web_url
          this.obj.fields = this.obj.fields.map(function(item) {
            item.value = resp.data[item.sign]
            return item
          })
        }
        this.obj.loading = false
      })
    },
    handleUpdate() {
      this.obj.form.show = true
      this.obj.form.status = 'update'
    }
  }
}
</script>
