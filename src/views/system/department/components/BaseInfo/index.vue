<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}</span>
      <el-button
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
import {
  getDepartmentApi as getObjApi
} from '@/api/system/department'

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
      obj: {
        loading: false,
        form: {
          show: false,
          status: 'update'
        },
        name: '',
        fields: [
          { name: '标识', sign: 'sign', value: '' }
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
