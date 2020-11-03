<template>
  <div class="app-container">
    <el-card
      v-loading="baseInfo.loading"
      shadow="never"
    >
      <div
        slot="header"
      >
        <span>
          {{ baseInfo.data.name }}
        </span>
      </div>
    </el-card>
    <el-tabs
      v-model="tab.active"
      @tab-click="changeTab"
    >
      <el-tab-pane
        v-for="item in tab.tab_list"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      />
    </el-tabs>
    <div
      v-if="tab.active === 'base'"
    >
      <el-card
        v-loading="baseInfo.loading"
        shadow="never"
      >
        <div
          slot="header"
        >
          <el-button
            v-permission="url.updateModUrl"
            style="float: right; padding: 3px 20px"
            type="text"
            @click="handleUpdateMod"
          >
            编辑
          </el-button>
        </div>
        <el-form
          :inline="true"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="名称"
              >
                <span>
                  {{ baseInfo.data.name }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="唯一标识"
                width="50%"
              >
                <span>
                  {{ baseInfo.data.sign }}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="排序值"
              >
                <span>
                  {{ baseInfo.data.rank }}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <div
      v-if="tab.active === 'permission'"
    >
      <div
        class="filter-container"
      >
        <el-form
          :inline="true"
          size="small"
        >
          <el-form-item
            label="权限类型"
          >
            <el-select
              v-model="permissionInfo.filter.typ"
              @change="getPermissionList"
            >
              <el-option
                v-for="item in permissionInfo.permissionForm.typOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              v-permission="url.createPermissionUrl"
              type="primary"
              icon="el-icon-plus"
              @click="handleCreatePermission"
            >
              增加权限
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="permissionInfo.loading"
        :data="permissionInfo.dataList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="权限名称"
          width="150"
        >
          <template slot-scope="{row}">
            <p>{{ row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="typ"
          label="权限类型"
          width="120"
        >
          <template slot-scope="{row}">
            <el-tag>{{ row.typ_desc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="sign"
          label="权限标识"
        >
          <template slot-scope="{row}">
            <p>{{ row.sign }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          label="排序值"
        >
          <template slot-scope="{row}">
            <p>{{ row.rank }}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180"
        >
          <template slot-scope="{row}">
            <el-button
              v-permission="url.updatePermissionUrl"
              type="text"
              size="small"
              style="margin-right: 8px"
              @click="handleUpdatePermission(row)"
            >
              编辑权限
            </el-button>
            <el-popconfirm
              title="确定删除?"
              @onConfirm="deletePermission(row.id)"
            >
              <el-button
                slot="reference"
                v-permission="url.deletePermissionUrl"
                type="text"
                size="mini"
              >
                删除权限
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :title="baseInfo.modForm.title"
      :visible.sync="baseInfo.modForm.visible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="modForm"
        :model="baseInfo.modForm.data"
        :rules="baseInfo.modForm.rules"
        label-width="80px"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="baseInfo.modForm.data.name"
          />
        </el-form-item>
        <el-form-item
          label="唯一标识"
          prop="sign"
        >
          <el-input
            v-model="baseInfo.modForm.data.sign"
          />
        </el-form-item>
        <el-form-item
          label="排序值"
          prop="rank"
        >
          <el-input
            v-model="baseInfo.modForm.data.rank"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateMod">确定</el-button>
          <el-button @click="cancelUpdateMod">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :title="permissionInfo.permissionForm.title"
      :visible.sync="permissionInfo.permissionForm.visible"
      :close-on-click-modal="false"
    >
      <el-form
        ref="permissionForm"
        :model="permissionInfo.permissionForm.data"
        :rules="permissionInfo.permissionForm.rules"
        label-width="80px"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="permissionInfo.permissionForm.data.name"
          />
        </el-form-item>
        <el-form-item
          label="唯一标识"
          prop="sign"
        >
          <el-input
            v-model="permissionInfo.permissionForm.data.sign"
          />
        </el-form-item>
        <el-form-item
          label="类型"
          prop="typ"
        >
          <el-select
            v-model="permissionInfo.permissionForm.data.typ"
          >
            <el-option
              v-for="typ in permissionInfo.permissionForm.typOptions"
              v-show="typ.value!==0"
              :key="typ.value"
              :value="typ.value"
              :label="typ.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="排序值"
          prop="rank"
        >
          <el-input
            v-model="permissionInfo.permissionForm.data.rank"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="opPermission"
          >确定</el-button>
          <el-button
            @click="cancelPermission"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import url from '@/api/system/mod/url'
import { getModApi, updateModApi } from '@/api/system/mod'
import { createPermissionApi, updatePermissionApi, deletePermissionApi, getPermissionListApi } from '@/api/system/permission'
export default {
  name: 'ModDetail',
  directives: { permission },
  data() {
    return {
      url,
      baseInfo: {
        loading: false,
        data: {},
        modForm: {
          title: '',
          visible: false,
          status: null,
          rules: {
            name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            sign: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }]
          },
          data: {
            name: '',
            sign: '',
            rank: 0
          }
        }
      },
      tab: {
        tab_list: [
          { name: 'base', label: '基本信息' },
          { name: 'permission', label: '权限管理' }
        ],
        active: 'base'
      },
      permissionInfo: {
        loading: false,
        total: 0,
        dataList: [],
        filter: {
          typ: 0
        },
        permissionForm: {
          title: '',
          visible: false,
          status: null,
          typOptions: [
            { name: '全部', value: 0 },
            { name: '操作权限', value: 10 },
            { name: '数据权限', value: 20 }
          ],
          rules: {
            name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
            sign: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }],
            typ: [{ required: true, message: '请选择类型', trigger: 'blur' }]
          },
          data: {
            permission_id: null,
            name: '',
            sign: '',
            typ: 10,
            rank: 0
          }
        }
      }
    }
  },
  created() {
    this.getMod()
    this.getPermissionList()
  },
  activated() {
    this.getMod()
    this.getPermissionList()
  },
  methods: {
    getMod() {
      this.baseInfo.loading = true
      const data = {
        mod_id: parseInt(this.$route.params.id)
      }
      getModApi(data).then(resp => {
        if (resp.code === 0) {
          this.baseInfo.data = resp.data
        }
        this.baseInfo.loading = false
      })
    },
    getPermissionList() {
      this.permissionInfo.loading = true
      const data = this.permissionInfo.filter
      data['mod_id'] = parseInt(this.$route.params.id)
      getPermissionListApi(data).then(resp => {
        if (resp.code === 0) {
          this.permissionInfo.dataList = resp.data.data_list
          this.permissionInfo.total = resp.data.total
        }
        this.permissionInfo.loading = false
      })
    },
    resetModForm() {
      this.baseInfo.modForm.data = {
        name: '',
        sign: '',
        rank: 0
      }
    },
    cancelUpdateMod() {
      this.baseInfo.modForm.visible = false
    },
    handleUpdateMod() {
      this.resetModForm()
      this.baseInfo.modForm.title = '编辑模块'
      this.baseInfo.modForm.data.name = this.baseInfo.data.name
      this.baseInfo.modForm.data.sign = this.baseInfo.data.sign
      this.baseInfo.modForm.data.rank = this.baseInfo.data.rank
      this.baseInfo.modForm.visible = true
      this.$nextTick(() => {
        this.$refs['modForm'].clearValidate()
      })
    },
    updateMod() {
      this.$refs['modForm'].validate((valid) => {
        if (valid) {
          this.baseInfo.modForm.loading = true
          const data = this.baseInfo.modForm.data
          data['mod_id'] = parseInt(this.$route.params.id)
          updateModApi(data).then(resp => {
            if (resp.code === 0) {
              this.baseInfo.modForm.visible = false
              this.$notify({
                title: '模块',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.getMod()
            }
            this.baseInfo.modForm.loading = false
          })
        }
      })
    },
    resetPermissionForm() {
      this.permissionInfo.permissionForm.data = {
        permission_id: null,
        name: '',
        sign: '',
        typ: 10,
        rank: 0
      }
    },
    cancelPermission() {
      this.permissionInfo.permissionForm.visible = false
    },
    handleCreatePermission() {
      this.resetPermissionForm()
      this.permissionInfo.permissionForm.title = '创建权限'
      this.permissionInfo.permissionForm.visible = true
      this.permissionInfo.permissionForm.status = 'create'
      this.$nextTick(() => {
        this.$refs['permissionForm'].clearValidate()
      })
    },
    opPermission() {
      if (this.permissionInfo.permissionForm.status === 'create') {
        this.createPermission()
      } else if (this.permissionInfo.permissionForm.status === 'update') {
        this.updatePermission()
      }
    },
    createPermission() {
      this.$refs['permissionForm'].validate((valid) => {
        if (valid) {
          this.permissionInfo.loading = true
          const data = this.permissionInfo.permissionForm.data
          data['mod_id'] = parseInt(this.$route.params.id)
          createPermissionApi(data).then(resp => {
            if (resp.code === 0) {
              this.permissionInfo.permissionForm.visible = false
              this.$notify({
                title: '权限',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.getPermissionList()
            }
            this.permissionInfo.loading = false
          })
        }
      })
    },
    handleUpdatePermission(permission) {
      this.resetPermissionForm()
      this.permissionInfo.permissionForm.title = '编辑权限'
      this.permissionInfo.permissionForm.visible = true
      this.permissionInfo.permissionForm.status = 'update'
      this.permissionInfo.permissionForm.data.permission_id = permission.id
      this.permissionInfo.permissionForm.data.name = permission.name
      this.permissionInfo.permissionForm.data.sign = permission.sign
      this.permissionInfo.permissionForm.data.typ = permission.typ
      this.permissionInfo.permissionForm.data.rank = permission.rank
      this.$nextTick(() => {
        this.$refs['permissionForm'].clearValidate()
      })
    },
    updatePermission() {
      this.$refs['permissionForm'].validate((valid) => {
        if (valid) {
          this.permissionInfo.loading = true
          const data = this.permissionInfo.permissionForm.data
          updatePermissionApi(data).then(resp => {
            if (resp.code === 0) {
              this.permissionInfo.permissionForm.visible = false
              this.$notify({
                title: '权限',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.getPermissionList()
            }
            this.permissionInfo.loading = false
          })
        }
      })
    },
    deletePermission(permission_id) {
      this.permissionInfo.loading = true
      const data = {
        permission_id
      }
      deletePermissionApi(data).then(resp => {
        if (resp.code === 0) {
          this.permissionInfo.permissionForm.visible = false
          this.$notify({
            title: '权限',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.getPermissionList()
        }
        this.permissionInfo.loading = false
      })
    },
    changeTab(tab, event) {
      this.tab.active = tab.name
      this.getTabData()
    },
    getTabData() {
      if (this.tab.active === 'base') {
        this.getMod()
      } else if (this.tab.active === 'permission') {
        this.getPermissionList()
      }
    }
  }
}
</script>

<style>
.el-card {
  border: none;
}
</style>
