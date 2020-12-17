<template>
  <div v-loading="loading" class="app-container">
    <el-card>
      <div slot="header">
        <span> 资产模块列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createAssetUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="sign" label="唯一标识">
            <template slot-scope="{row}">
              <CopyField :value="row.sign" />
            </template>
          </el-table-column>
          <el-table-column prop="rank" label="排序值" />
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{row}">
              <EnterField :value="row.remark" />
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160"
          >
            <template slot-scope="{row}">
              <el-button v-permission="[url.updateAssetUrl]" size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row)">
                编辑
              </el-button>
              <el-popconfirm v-permission="[url.deleteAssetUrl]" title="确定删除?" @onConfirm="deleteObj(row.id)">
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
import EnterField from '@/components/Field/EnterField'
import url from '@/api/asset/asset/url'
import {
  deleteAssetApi as deleteObjApi,
  getAssetListApi as getObjListApi
} from '@/api/asset/asset'
import ObjDialog from './components/ObjDialog'
export default {
  name: 'Asset',
  components: { Pagination, ObjDialog, CopyField, EnterField },
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
        } else {
          this.loading = false
        }
      })
    }
  }
}
</script>
