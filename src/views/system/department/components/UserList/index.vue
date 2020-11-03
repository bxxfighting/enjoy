<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 用户列表({{ obj.total }}) </span>
        <el-button icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj"> 添加 </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="user.name" label="名称" />
          <el-table-column prop="user.username" label="用户名">
            <template slot-scope="{row}">
              <CopyField :value="row.user.username" />
            </template>
          </el-table-column>
          <el-table-column prop="typ_desc" label="类型" />
          <el-table-column prop="user.email" label="邮箱" />
          <el-table-column prop="user.phone" label="手机号" />
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'UserDetail', params:{ id: row.user.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.user.id)">
                <el-button slot="reference" size="mini" type="text">
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
import ObjDialog from './components/ObjDialog'
import {
  getDepartmentUserListApi as getObjListApi,
  deleteDepartmentUserApi as deleteObjApi,
} from '@/api/system/department'
export default {
  name: 'UserList',
  directives: { permission },
  components: { Pagination, CopyField, ObjDialog },
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
        total: 0,
        dataList: [],
        filter: {
          page_num: 1,
          page_size: 20
        },
        form: {
          obj_id: this.objId,
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
      this.obj.loading = true
      const data = this.obj.filter
      data['obj_id'] = parseInt(this.objId)
      getObjListApi(data).then(resp => {
        if (resp.code === 0) {
          this.obj.dataList = resp.data.data_list
          this.obj.total = resp.data.total
        }
        this.obj.loading = false
      })
    },
    handleCreateObj() {
      this.obj.form.status = 'create'
      this.obj.form.show = true
    },
    deleteObj(obj_id) {
      this.loading = true
      const data = {
        department_id: parseInt(this.objId),
        user_id: obj_id
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