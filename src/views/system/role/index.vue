<template>
  <div v-loading="loading" class="app-container">
    <el-row :gutter="20">
      <el-col
        v-loading="obj.loading"
        :span="8"
        class="el-col-role"
      >
    <el-card>
      <div slot="header">
        <span> 角色列表({{ obj.total }}) </span>
        <el-button
          v-permission="[url.createRoleUrl]"
          icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table 
          :data="obj.dataList"
          style="width: 100%"
          :highlight-current-row="true"
          :current-row-key="obj.obj_id"
          row-key="id"
          @row-click="handleSelectObj"
        >
          <el-table-column
            prop="name"
            label="名称"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'RoleDetail', params:{ id: row.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
              <el-button
                v-permission="[url.updateRoleUrl]"
                size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row)">
                编辑
              </el-button>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.id)">
                <el-button
                  v-permission="[url.deleteRoleUrl]"
                  slot="reference" size="mini" type="text">
                  删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="obj.total>0" :total="obj.total" :page.sync="obj.filter.page_num" :limit.sync="obj.filter.page_size" @pagination="getObjList" />
      </div>
    </el-card>
    </el-col>
    <el-col
      :span="16"
    >
      <PermissionTable
        :obj-id="String(obj.obj_id)"
      />
    </el-col>
    </el-row>
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
import PermissionTable from './components/PermissionTable'
import url from '@/api/system/role/url'
import {
  deleteRoleApi as deleteObjApi,
  getRoleListApi as getObjListApi
} from '@/api/system/role'
import ObjDialog from './components/ObjDialog'
export default {
  name: 'Role',
  components: { Pagination, ObjDialog, CopyField, PermissionTable },
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
    handleSelectObj(row) {
      this.obj.obj_id = row.id
    },
    getObjList() {
      this.loading = true
      const data = this.obj.filter
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
          if (resp.data.data_list.length > 0) {
            this.obj.obj_id = resp.data.data_list[0].id
          }
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

<style>
.el-col-role {
  min-width: 260px;
}
</style>