<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}</span>
    </div>
    <Tile :fields="obj.fields" />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/redis/url'
import {
  getRedisApi as getObjApi
} from '@/api/asset/redis'

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
        fields: [
          { name: '实例ID', sign: 'instance_id', value: '' },
          { name: '数据库版本', sign: 'version', value: '' },
          { name: '端口号', sign: 'port', value: '' },
          { name: '内网IP', sign: 'inner_ip', value: '' },
          { name: '部署类型', sign: 'deploy_typ', value: '' },
          { name: '连接字符串', sign: 'connection', value: '' },
          { name: '地域', sign: 'region_id', value: '' },
          { name: '可用区', sign: 'zone_id', value: '' }
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
