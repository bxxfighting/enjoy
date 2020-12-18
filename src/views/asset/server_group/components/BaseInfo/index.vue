<template>
  <el-card v-loading="obj.loading" shadow="never">
    <div slot="header">
      <span>{{ obj.name }}
        <router-link
          :to="{name: 'SlbDetail', params:{ id: obj.slb.id }}"
        >
          <el-button size="mini" type="text" style="margin-right: 8px">
            (所属SLB: {{ obj.slb.name }})
          </el-button>
        </router-link>
      </span>
    </div>
    <Tile :fields="obj.fields" />
  </el-card>
</template>

<script>
import { getValue } from '@/utils/mix'
import Tile from '@/components/Tile'
import permission from '@/directive/permission/index.js'
import url from '@/api/asset/slb/url'
import {
  getSlbServerGroupApi as getObjApi
} from '@/api/asset/slb'

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
        slb: {},
        fields: [
          { name: '实例ID', sign: 'instance_id', value: '' },
          { name: '类型', sign: 'typ_desc', value: '' },
          { name: '地域', sign: 'slb.region_id', value: '' },
          { name: '可用区', sign: 'slb.zone_id', value: '' },
          { name: '网络类型', sign: 'slb.ip_typ_desc', value: '' },
          { name: 'SLB IP', sign: 'slb.ip', value: '' }
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
          this.obj.slb = resp.data.slb
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
