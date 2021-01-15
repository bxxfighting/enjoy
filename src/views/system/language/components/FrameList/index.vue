<template>
  <div>
    <el-card>
      <div slot="header">
        <span> 框架列表({{ obj.total }}) </span>
        <el-button v-permission="[url.createFrameUrl]" icon="el-icon-plus" type="text" size="small" style="float: right; padding: 3px 0;" @click="handleCreateObj">
          添加
        </el-button>
      </div>
      <div>
        <el-table :data="obj.dataList" style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="sign" label="标识" />
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="{row}">
              <el-button v-permission="[url.updateFrameUrl]" size="mini" type="text" style="margin-right: 8px" @click="handleUpdateObj(row)">
                编辑
              </el-button>
              <el-popconfirm title="确定删除?" @onConfirm="deleteObj(row.id)">
                <el-button slot="reference" v-permission="[url.deleteFrameUrl]" size="mini" type="text">
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
      :language-id="parseInt(objId)"
      :status.sync="obj.form.status"
      :show.sync="obj.form.show"
      @success="getObjList"
    />
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import Pagination from '@/components/Pagination'
import ObjDialog from './components/ObjDialog'
import url from '@/api/business/service/url'
import {
  getFrameListApi as getObjListApi,
  deleteFrameApi as deleteObjApi
} from '@/api/business/service'
export default {
  name: 'FrameList',
  directives: { permission },
  components: { Pagination, ObjDialog },
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
      data['language_id'] = this.objId
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
    handleUpdateObj(row) {
      this.obj.form.obj_id = row.id
      this.obj.form.status = 'update'
      this.obj.form.show = true
    },
    deleteObj(obj_id) {
      this.loading = true
      const data = {
        obj_id: obj_id
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
