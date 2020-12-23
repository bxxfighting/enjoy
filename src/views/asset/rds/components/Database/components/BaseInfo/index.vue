<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}
        <router-link
          :to="{name: 'RdsDetail', params:{ id: obj.rds.id }}"
        >
          <el-button size="mini" type="text" style="margin-right: 8px">
            (所属RDS: {{ obj.rds.name }})
          </el-button>
        </router-link>
      </span>
    </div>
    <Tile :fields="obj.fields" />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import { getValue } from '@/utils/mix'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/rds/url'
import {
  getRdsDatabaseApi as getObjApi
} from '@/api/asset/rds'

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
        rds: {},
        fields: [
          { name: '数据库类型', sign: 'rds.typ', value: '' },
          { name: '数据库版本', sign: 'rds.version', value: '' },
          { name: '主从类型', sign: 'rds.db_typ', value: '' },
          { name: '内网/外网', sign: 'rds.db_net_typ_desc', value: '' },
          { name: 'EIP/VPC', sign: 'rds.net_typ', value: '' },
          { name: '连接字符串', sign: 'rds.connection', value: '' },
          { name: '地域', sign: 'rds.region_id', value: '' },
          { name: '可用区', sign: 'rds.zone_id', value: '' },
          { name: '备注', sign: 'desc', value: '' }
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
          this.obj.rds = resp.data.rds
          this.obj.fields = this.obj.fields.map(function(item) {
            item.value = getValue(resp.data, item.sign)
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
