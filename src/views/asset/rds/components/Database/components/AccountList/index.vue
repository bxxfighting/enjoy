<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 账号列表({{ obj.total }}) </span>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="username" label="用户名">
            <template slot-scope="{row}">
              <CopyField :value="row.account.username" />
            </template>
          </el-table-column>
          <el-table-column prop="privilege" label="权限" />
          <el-table-column prop="password" label="密码">
            <template slot-scope="{row}">
              <CopyField :value="row.account.password" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="{row}">
              <el-button v-permission="[url.updateRdsAccountUrl]" size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row.account.id)">
                编辑
              </el-button>
              <router-link
                :to="{name: 'RdsAccountDetail', params:{ id: row.account.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <ObjDialog
      :obj-id="obj.form.objId"
      :status="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObjList"
    />
  </div>
</template>

<script>
import CopyField from '@/components/Field/CopyField'
import ObjDialog from '@/views/asset/rds/components/Account/components/ObjDialog'
import permission from '@/directive/permission/index.js'
import {
  getRdsDatabaseAccountListApi as getObjListApi
} from '@/api/asset/rds'
import url from '@/api/asset/rds/url'
export default {
  name: 'RdsAccountList',
  directives: { permission },
  components: { CopyField, ObjDialog },
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
        total: 0,
        dataList: [],
        form: {
          objId: null,
          show: false,
          status: 'update'
        },
        filter: {
        }
      }
    }
  },
  created() {
    this.getObjList()
  },
  activated() {
    this.getObjList()
  },
  methods: {
    getObjList() {
      this.obj.loading = true
      const data = this.obj.filter
      data['obj_id'] = this.objId
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.obj.loading = false
      })
    },
    handleUpdateObj(obj_id) {
      this.obj.form.objId = obj_id
      this.obj.form.show = true
      this.obj.form.status = 'update'
    }
  }
}
</script>
