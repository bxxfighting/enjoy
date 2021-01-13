<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> Gitlab服务列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createGitlabServerUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            prop="host"
            label="地址"
          >
            <template slot-scope="{row}">
              <CopyField :value="row.host" />
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
          >
            <template slot-scope="{row}">
              <CopyField :value="row.username" />
            </template>
          </el-table-column>
          <el-table-column
            prop="password"
            label="密码"
          >
            <template slot-scope="{row}">
              <CopyField :value="row.password" />
            </template>
          </el-table-column>
          <el-table-column
            prop="token"
            label="Token"
          >
            <template slot-scope="{row}">
              <CopyField :value="row.token" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{row}">
              <el-button v-permission="[url.updateGitlabServerUrl]" size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row)">
                编辑
              </el-button>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.id)">
                <el-button slot="reference" v-permission="[url.deleteGitlabServerUrl]" size="mini" type="text">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="obj.total>0" :total="obj.total" :page.sync="obj.filter.page_num" :limit.sync="obj.filter.page_size" @pagination="getObjList" />
      </div>
    </el-card>
    <ObjDialog
      :obj-id="parseInt(obj.form.obj_id)"
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
import url from '@/api/component/gitlab/url'
import {
  deleteGitlabServerApi as deleteObjApi,
  getGitlabServerListApi as getObjListApi
} from '@/api/component/gitlab'
import ObjDialog from './components/ObjDialog'
export default {
  name: 'GitlabServer',
  components: { Pagination, ObjDialog, CopyField },
  directives: { permission },
  data() {
    return {
      url,
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
    }
  }
}
</script>
