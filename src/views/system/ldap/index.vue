<template>
  <div v-loading="obj.loading" class="app-container">
    <el-card>
      <div slot="header">
        <span>LDAP配置</span>
        <el-button
          v-permission="[url.updateLdapConfigUrl]"
          style="float: right; padding: 3px 0"
          type="text"
          icon="el-icon-edit"
          @click="handleUpdate"
        > 编辑 </el-button>
      </div>
      <Tile :fields="obj.fields" />
      <ObjDialog
        :status="obj.form.status"
        :show.sync="obj.form.show"
        @success="getObj"
      />
    </el-card>
  </div>
</template>

<script>
import Tile from '@/components/Tile'
import ObjDialog from './components/ObjDialog'
import permission from '@/directive/permission/index.js'
import url from '@/api/component/ldap/url'
import { getValue } from '@/utils/mix'
import {
  getLdapConfigApi as getObjApi
} from '@/api/component/ldap'

export default {
  name: 'Ldap',
  components: { Tile, ObjDialog },
  directives: { permission },
  data() {
    return {
      url,
      obj: {
        loading: false,
        form: {
          show: false,
          status: 'update'
        },
        fields: [
          { name: '地址', sign: 'host', value: '' },
          { name: '管理员DN', sign: 'admin_dn', value: '' },
          { name: '管理员密码', sign: 'admin_password', value: '' },
          { name: '用户基础DN', sign: 'member_base_dn', value: '' }
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
      const data = {}
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
