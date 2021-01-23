<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 用户列表({{ obj.total }}) </span>
        <el-button v-permission="[ldap_url.syncLdapUserUrl]" icon="el-icon-refresh" type="text" size="small" style="float: right; padding: 3px 0;" @click="syncObj">同步</el-button>
        <el-button v-permission="[url.createUserUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 10px;" @click="handleCreateObj">添加</el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="username" label="用户名">
            <template slot-scope="{row}">
              <CopyField :value="row.username" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="typ_desc" label="类型" />
          <el-table-column prop="status_desc" label="状态" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="phone" label="手机号" />
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'UserDetail', params:{ id: row.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
              <el-button v-permission="[url.updateUserUrl]" size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row)">编辑</el-button>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.id)">
                <el-button slot="reference" v-permission="[url.deleteUserUrl]" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="obj.total>0" :total="obj.total" :page.sync="obj.filter.page_num" :limit.sync="obj.filter.page_size" @pagination="getObjList" />
      </div>
    </el-card>
    <ObjDialog
      :obj-id="String(obj.form.obj_id)"
      :status.sync="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObjList"
    />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import CopyField from '@/components/Field/CopyField'
import url from '@/api/system/user/url'
import ldap_url from '@/api/component/ldap/url'

import {
  deleteUserApi as deleteObjApi,
  getUserListApi as getObjListApi
} from '@/api/system/user'
import {
  syncLdapUserApi as syncObjApi
} from '@/api/component/ldap'
import ObjDialog from './components/ObjDialog'
export default {
  name: 'User',
  components: { Pagination, ObjDialog, CopyField },
  directives: { permission },
  data() {
    return {
      url,
      ldap_url,
      loading: false,
      obj: {
        total: 0,
        dataList: [],
        obj_id: null,
        filter: {
          page_num: 1,
          page_size: 10
        },
        form: {
          obj_id: null,
          show: false,
          status: 'create'
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
      this.loading = true
      const data = this.obj.filter
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.loading = false
      })
    },
    handleCreateObj() {
      this.obj.form.status = 'create'
      this.obj.form.show = true
    },
    handleUpdateObj(row) {
      this.obj.form.obj_id = row.id
      this.obj.form.status = 'update'
      this.obj.form.show = true
    },
    deleteObj(obj_id) {
      this.loading = true
      const data = {
        obj_id: parseInt(obj_id)
      }
      deleteObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getObjList()
        }
      })
    },
    syncObj() {
      this.loading = true
      const data = {}
      syncObjApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        }
        this.loading = false
      })
    }
  }
}
</script>
