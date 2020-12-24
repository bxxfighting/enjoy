<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <CopyField :value="obj.name" />
      <span v-if="obj.asset!==null&&obj.asset.typ==='ecs'">
        [解析至{{ obj.asset.typ }}:
        <router-link
          :to="{name: 'EcsDetail', params:{ id: obj.asset.id }}"
        >
          <el-button size="mini" type="text" style="margin-right: 8px">{{ obj.asset.name }}</el-button>
        </router-link>]
      </span>
      <span v-else-if="obj.asset!==null&&obj.asset.typ==='slb'">
        [解析至{{ obj.asset.typ }}:
        <router-link
          :to="{name: 'SlbDetail', params:{ id: obj.asset.id }}"
        >
          <el-button size="mini" type="text" style="margin-right: 8px">{{ obj.asset.name }}</el-button>
        </router-link>]
      </span>
    </div>
    <Tile :fields="obj.fields" />
  </el-card>
</template>

<script>
import Tile from '@/components/Tile'
import CopyField from '@/components/Field/CopyField'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/domain/url'
import {
  getDomainRecordApi as getObjApi
} from '@/api/asset/domain'

export default {
  name: 'BaseInfo',
  components: { Tile, CopyField },
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
        asset: null,
        fields: [
          { name: '实例ID', sign: 'instance_id', value: '' },
          { name: '类型', sign: 'typ', value: '' },
          { name: 'RR', sign: 'rr', value: '' },
          { name: 'Value', sign: 'value', value: '' },
          { name: '是否启用', sign: 'enabled', value: '' }
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
          this.obj.name = resp.data.fullname
          this.obj.asset = resp.data.asset
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
