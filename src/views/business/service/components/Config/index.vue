<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>基础配置</span>
      <el-button
        v-permission="[url.updateServiceConfigUrl]"
        style="float: right; padding: 3px 0"
        type="text"
        icon="el-icon-edit"
        @click="handleUpdate"
      > 编辑 </el-button>
    </div>
    <Tile :fields="obj.fields" />
    <ObjDialog
      :obj-id="objId"
      :environment-id="environmentId"
      :status="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObj"
    />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import ObjDialog from './components/ObjDialog'
import permission from '@/directive/permission/index.js'
import url from '@/api/business/service/url'
import { getValue } from '@/utils/mix'
import {
  getServiceConfigApi as getObjApi
} from '@/api/business/service'

export default {
  name: 'Config',
  components: { Tile, ObjDialog },
  directives: { permission },
  props: {
    objId: {
      required: true,
      type: Number
    },
    environmentId: {
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
          { name: '端口号', sign: 'port', value: '' },
          { name: '解析类型', sign: 'dns_typ_desc', value: '' },
          { name: '制品类型', sign: 'artifact_typ_desc', value: '' },
          { name: '部署类型', sign: 'deploy_typ_desc', value: '' }
        ]
      }
    }
  },
  watch: {
    environmentId: function() {
      this.getObj()
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
        obj_id: this.objId,
        environment_id: this.environmentId
      }
      getObjApi(data).then(resp => {
        if (resp.code === 0) {
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
