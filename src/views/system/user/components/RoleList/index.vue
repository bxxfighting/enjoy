<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 角色列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createRoleUserUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="role.name" label="名称" />
          <el-table-column prop="role.sign" label="唯一标识">
            <template slot-scope="{row}">
              <CopyField :value="row.role.sign" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <router-link
                :to="{name: 'RoleDetail', params:{ id: row.role.id }}"
              >
                <el-button size="mini" type="text" style="margin-right: 8px"> 查看 </el-button>
              </router-link>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.role.id)">
                <el-button slot="reference" v-permission="[url.deleteRoleUserUrl]" size="mini" type="text"> 删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
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
import CopyField from '@/components/Field/CopyField'
import ObjDialog from './components/ObjDialog'
import url from '@/api/system/role/url'
import {
  getUserRoleListApi as getObjListApi
} from '@/api/system/user'
import {
  deleteRoleUserApi as deleteObjApi
} from '@/api/system/role'
export default {
  name: 'RoleList',
  directives: { permission },
  components: { CopyField, ObjDialog },
  props: {
    objId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      url,
      obj: {
        loading: false,
        total: 0,
        dataList: [],
        filter: {
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
        user_id: parseInt(this.objId),
        role_id: obj_id
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
