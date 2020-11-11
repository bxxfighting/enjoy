<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}</span>
      <el-button
        v-permission="[url.updateServiceUrl]"
        style="float: right; padding: 3px 0"
        type="text"
        icon="el-icon-edit"
        @click="handleUpdate"
      > 编辑 </el-button>
    </div>
    <Tile :fields="obj.fields" />
    <ObjDialog
      :obj-id="String(objId)"
      :status="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObj"
    />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import ObjDialog from '../ObjDialog'
import permission from '@/directive/permission/index.js'
import url from '@/api/business/service/url'
import {
  getServiceApi as getObjApi
} from '@/api/business/service'

export default {
  name: 'BaseInfo',
  components: { Tile, ObjDialog },
  directives: { permission },
  props: {
    objId: {
      required: true,
      type: String
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
          { name: '标识', sign: 'sign', value: '' },
          { name: '录入时间', sign: 'dt_create', value: '' },
          { name: '备注', sign: 'remark', value: '' }
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
            if (resp.data[item.sign] !== null) {
              item.value = resp.data[item.sign].toString()
            }
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
