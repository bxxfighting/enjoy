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
      <el-button
        v-permission="[url.updateRdsAccountUrl]"
        style="float: right; padding: 3px 0"
        type="text"
        icon="el-icon-edit"
        @click="handleUpdate"
      > 编辑 </el-button>
    </div>
    <Tile :fields="obj.fields" />
    <ObjDialog
      :obj-id="objId"
      :status="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObj"
    />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import ObjDialog from '../ObjDialog'
import { getValue } from '@/utils/mix'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/rds/url'
import {
  getRdsAccountApi as getObjApi
} from '@/api/asset/rds'

export default {
  name: 'BaseInfo',
  components: { Tile, ObjDialog },
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
          { name: '密码', sign: 'password', value: '' }
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
          this.obj.name = resp.data.username
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
