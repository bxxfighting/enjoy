<template>
  <el-table
    v-loading="loading"
    :data="mod.dataList"
    style="width: 100%;"
  >
    <el-table-column
      prop="name"
      label="模块"
      width="150"
    >
      <template slot-scope="{row}">
        <el-checkbox-group
          v-model="mod.checkModList"
        >
          <el-checkbox
            :label="row.id"
            :disabled="!checkPermission(url.setRoleModUrl)"
            @change="checked=>opRoleMod(checked, row.id)"
          >
            {{ row.name }}
          </el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
    <el-table-column
      prop="op_permission"
      label="操作权限"
    >
      <template slot-scope="{row}">
        <el-checkbox-group
          v-model="mod.checkPermissionList"
        >
          <el-checkbox
            v-for="permission in row.op_permissions"
            :key="permission.id"
            :label="permission.id"
            :disabled="!checkPermission(url.setRolePermissionUrl)"
            @change="checked=>opRolePermission(checked, permission.id)"
          >{{ permission.name }}</el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
    <el-table-column
      prop="data_permission"
      label="数据权限"
      width="300"
    >
      <template slot-scope="{row}">
        <el-checkbox-group
          v-model="mod.checkPermissionList"
        >
          <el-checkbox
            v-for="permission in row.data_permissions"
            :key="permission.id"
            :label="permission.id"
            :disabled="!checkPermission(url.setRolePermissionUrl)"
            @change="checked=>opRolePermission(checked, permission.id)"
          >{{ permission.name }}</el-checkbox>
        </el-checkbox-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import checkPermission from '@/utils/permission'
import permission from '@/directive/permission/index.js'
import url from '@/api/system/role/url'
import { getModListApi } from '@/api/system/mod'
import {
  getRoleModPermissionApi,
  setRoleModApi,
  setRolePermissionApi
} from '@/api/system/role'
export default {
  name: 'Role',
  directives: { permission },
  props: {
    objId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      url,
      loading: false,
      obj_id: this.objId,
      mod: {
        dataList: [],
        checkModList: [],
        checkPermissionList: []
      }
    }
  },
  watch: {
    objId: function() {
      this.obj_id = this.objId
      this.getRole()
    }
  },
  created() {
    this.getModList()
    this.getRole()
  },
  activated() {
    this.getModList()
    this.getRole()
  },
  methods: {
    checkPermission,
    getModList() {
      this.loading = true
      getModListApi().then(resp => {
        if (resp.code === 0) {
          this.mod.dataList = resp.data.data_list
        }
        this.loading = false
      })
    },
    getRole() {
      if (this.obj_id === String(null)) {
        return
      }
      this.loading = true
      const data = {
        obj_id: parseInt(this.obj_id),
        need_permission: true
      }
      getRoleModPermissionApi(data).then(resp => {
        if (resp.code === 0) {
          this.mod.checkModList = resp.data.mod_ids
          this.mod.checkPermissionList = resp.data.permission_ids
        }
        this.loading = false
      })
    },
    opRoleMod(checked, mod_id) {
      this.loading = true
      const data = {
        obj_id: parseInt(this.obj_id),
        mod_id: parseInt(mod_id)
      }
      if (checked === true) {
        data['status'] = 'create'
      } else if (checked === false) {
        data['status'] = 'delete'
      }
      setRoleModApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getRole()
        }
      })
      this.loading = false
    },
    opRolePermission(checked, permission_id) {
      this.loading = true
      const data = {
        obj_id: parseInt(this.obj_id),
        permission_id
      }
      if (checked === true) {
        data['status'] = 'create'
      } else if (checked === false) {
        data['status'] = 'delete'
      }
      setRolePermissionApi(data).then(resp => {
        if (resp.code === 0) {
          this.$notify({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getRole()
        }
      })
      this.loading = false
    }
  }
}
</script>
