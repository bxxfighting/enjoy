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
import url from '@/api/asset/ecs/url'
import {
  getEcsApi as getObjApi
} from '@/api/asset/ecs'

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
          { name: '主机名', sign: 'hostname', value: '' },
          { name: '内网IP', sign: 'inner_ip', value: '' },
          { name: '外网IP', sign: 'outer_ip', value: '' },
          { name: 'CPU', sign: 'cpu', value: '' },
          { name: '内存(M)', sign: 'memory', value: '' },
          { name: '地域', sign: 'region_id', value: '' },
          { name: '可用区', sign: 'zone_id', value: '' },
          { name: '购买时间', sign: 'dt_buy', value: '' }
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
